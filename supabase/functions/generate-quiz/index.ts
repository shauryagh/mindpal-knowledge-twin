import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { documentId } = await req.json()
    
    // Get the NextGenMindz API key from secrets
    const apiKey = Deno.env.get('NEXTGEN_MINDZ_API_KEY')
    if (!apiKey) {
      throw new Error('API key not found')
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Mock document content (in real implementation, fetch from storage)
    const documentContent = `
    Neural Networks Fundamentals
    
    Neural networks are computing systems inspired by biological neural networks that constitute animal brains. 
    They consist of artificial neurons (nodes) that are connected and transmit signals between each other.
    
    Key Concepts:
    1. Perceptron - The basic unit of computation
    2. Activation Functions - Determine neuron output (sigmoid, ReLU, tanh)
    3. Backpropagation - Learning algorithm that adjusts weights
    4. Gradient Descent - Optimization technique to minimize error
    5. Deep Learning - Neural networks with multiple hidden layers
    
    Applications include computer vision, natural language processing, and pattern recognition.
    `

    // Generate quiz using AI (using NextGenMindz API)
    const quizPrompt = `Based on the following document content, generate a quiz with 5 multiple choice questions. 
    Each question should have 4 options and include an explanation for the correct answer.
    
    Document: ${documentContent}
    
    Return the response in this exact JSON format:
    {
      "title": "Quiz Title",
      "description": "Brief description",
      "questions": [
        {
          "question": "Question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0,
          "explanation": "Explanation of why this is correct"
        }
      ]
    }`

    // Call NextGenMindz API (mock response for now)
    const quizData = {
      id: crypto.randomUUID(),
      title: "Neural Networks Fundamentals Quiz",
      description: "Test your understanding of neural network concepts",
      sourceDocument: "Neural Networks Fundamentals.pdf",
      questions: [
        {
          id: "q1",
          question: "What is the basic unit of computation in a neural network?",
          options: ["Synapse", "Perceptron", "Dendrite", "Axon"],
          correctAnswer: 1,
          explanation: "A perceptron is the basic unit of computation in a neural network, inspired by biological neurons."
        },
        {
          id: "q2",
          question: "Which activation function is most commonly used in modern deep learning?",
          options: ["Sigmoid", "Tanh", "ReLU", "Linear"],
          correctAnswer: 2,
          explanation: "ReLU (Rectified Linear Unit) is widely used because it helps avoid the vanishing gradient problem."
        },
        {
          id: "q3",
          question: "What is the primary purpose of backpropagation?",
          options: ["Forward pass computation", "Weight adjustment", "Data preprocessing", "Model evaluation"],
          correctAnswer: 1,
          explanation: "Backpropagation is the algorithm used to adjust weights by propagating errors backward through the network."
        },
        {
          id: "q4",
          question: "What characterizes deep learning?",
          options: ["Single layer networks", "Multiple hidden layers", "Linear activation only", "No training required"],
          correctAnswer: 1,
          explanation: "Deep learning uses neural networks with multiple hidden layers to learn complex patterns."
        },
        {
          id: "q5",
          question: "Which of these is NOT a common application of neural networks?",
          options: ["Computer vision", "Natural language processing", "Database indexing", "Pattern recognition"],
          correctAnswer: 2,
          explanation: "Database indexing is a traditional computer science problem not typically solved with neural networks."
        }
      ]
    }

    // Store quiz in database
    const { data, error } = await supabaseClient
      .from('quizzes')
      .insert([{
        id: quizData.id,
        title: quizData.title,
        description: quizData.description,
        source_document: quizData.sourceDocument,
        questions: quizData.questions,
        created_at: new Date().toISOString()
      }])

    if (error) {
      console.error('Database error:', error)
    }

    return new Response(
      JSON.stringify(quizData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})