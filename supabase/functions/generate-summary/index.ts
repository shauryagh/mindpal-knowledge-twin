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
    Machine Learning Ethics and AI Governance
    
    As artificial intelligence becomes increasingly prevalent in society, the ethical implications 
    of machine learning systems have become a critical area of study. Key concerns include:
    
    1. Algorithmic Bias - ML models can perpetuate or amplify existing societal biases
    2. Privacy and Data Protection - Ensuring user data is handled responsibly
    3. Transparency and Explainability - Making AI decisions understandable
    4. Accountability - Determining responsibility for AI system outcomes
    5. Fairness - Ensuring equitable treatment across different groups
    6. Safety and Security - Preventing misuse and ensuring robust systems
    
    Governance frameworks are being developed to address these challenges through:
    - Regulatory compliance requirements
    - Industry standards and best practices
    - Ethical review boards and oversight committees
    - Technical solutions for bias detection and mitigation
    `

    // Generate summary using AI (using NextGenMindz API)
    const summaryPrompt = `Summarize the following document and extract key points:
    
    Document: ${documentContent}
    
    Provide a comprehensive summary and list the main key points.`

    // Call NextGenMindz API (mock response for now)
    const summaryData = {
      id: crypto.randomUUID(),
      documentId: documentId,
      title: "Machine Learning Ethics Summary",
      content: "Machine learning ethics has emerged as a crucial field addressing the responsible development and deployment of AI systems. As these technologies become more widespread, concerns about bias, privacy, transparency, and accountability have grown. The field focuses on ensuring that AI systems are developed and used in ways that benefit society while minimizing potential harms. Key areas include preventing algorithmic bias that could discriminate against certain groups, protecting user privacy and data, making AI decisions more transparent and explainable, establishing clear accountability frameworks, ensuring fairness across different populations, and maintaining safety and security standards.",
      keyPoints: [
        "Algorithmic bias can perpetuate societal inequalities and must be actively prevented",
        "Privacy protection requires careful handling of user data throughout the ML pipeline",
        "Transparency in AI decision-making helps build trust and enables oversight",
        "Clear accountability frameworks are needed to assign responsibility for AI outcomes",
        "Fairness considerations must address equitable treatment across different groups",
        "Safety and security measures prevent misuse and ensure robust system performance",
        "Governance frameworks combine regulation, standards, and technical solutions",
        "Ethical review boards provide oversight for AI development and deployment"
      ],
      createdAt: new Date().toISOString()
    }

    // Store summary in database
    const { data, error } = await supabaseClient
      .from('summaries')
      .insert([{
        id: summaryData.id,
        document_id: summaryData.documentId,
        title: summaryData.title,
        content: summaryData.content,
        key_points: summaryData.keyPoints,
        created_at: summaryData.createdAt
      }])

    if (error) {
      console.error('Database error:', error)
    }

    return new Response(
      JSON.stringify(summaryData),
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