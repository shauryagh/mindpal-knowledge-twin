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
    Deep Learning and Computer Vision
    
    Deep learning has revolutionized computer vision through convolutional neural networks (CNNs).
    
    Key architectures include:
    1. LeNet - Early CNN for digit recognition
    2. AlexNet - Breakthrough in ImageNet competition
    3. VGG - Very deep networks with small filters
    4. ResNet - Residual connections for very deep networks
    5. YOLO - Real-time object detection
    
    Applications:
    - Image classification
    - Object detection and segmentation
    - Facial recognition
    - Medical image analysis
    - Autonomous vehicles
    `

    // Generate mindmap structure using AI
    const mindmapData = {
      id: crypto.randomUUID(),
      documentId: documentId,
      title: "Deep Learning & Computer Vision Map",
      nodes: [
        { 
          id: 'root', 
          label: 'Deep Learning Vision', 
          x: 400, 
          y: 200, 
          level: 0, 
          children: ['architectures', 'applications', 'techniques'], 
          color: '#8B5CF6' 
        },
        { 
          id: 'architectures', 
          label: 'CNN Architectures', 
          x: 200, 
          y: 320, 
          level: 1, 
          children: ['lenet', 'alexnet', 'resnet'], 
          color: '#06B6D4' 
        },
        { 
          id: 'applications', 
          label: 'Applications', 
          x: 400, 
          y: 350, 
          level: 1, 
          children: ['classification', 'detection', 'medical'], 
          color: '#10B981' 
        },
        { 
          id: 'techniques', 
          label: 'Techniques', 
          x: 600, 
          y: 320, 
          level: 1, 
          children: ['convolution', 'pooling', 'dropout'], 
          color: '#F59E0B' 
        },
        { 
          id: 'lenet', 
          label: 'LeNet', 
          x: 100, 
          y: 450, 
          level: 2, 
          children: [], 
          color: '#06B6D4' 
        },
        { 
          id: 'alexnet', 
          label: 'AlexNet', 
          x: 200, 
          y: 450, 
          level: 2, 
          children: [], 
          color: '#06B6D4' 
        },
        { 
          id: 'resnet', 
          label: 'ResNet', 
          x: 300, 
          y: 450, 
          level: 2, 
          children: [], 
          color: '#06B6D4' 
        },
        { 
          id: 'classification', 
          label: 'Image Classification', 
          x: 350, 
          y: 480, 
          level: 2, 
          children: [], 
          color: '#10B981' 
        },
        { 
          id: 'detection', 
          label: 'Object Detection', 
          x: 450, 
          y: 480, 
          level: 2, 
          children: [], 
          color: '#10B981' 
        },
        { 
          id: 'medical', 
          label: 'Medical Imaging', 
          x: 400, 
          y: 420, 
          level: 2, 
          children: [], 
          color: '#10B981' 
        },
        { 
          id: 'convolution', 
          label: 'Convolution', 
          x: 550, 
          y: 450, 
          level: 2, 
          children: [], 
          color: '#F59E0B' 
        },
        { 
          id: 'pooling', 
          label: 'Pooling', 
          x: 650, 
          y: 450, 
          level: 2, 
          children: [], 
          color: '#F59E0B' 
        },
        { 
          id: 'dropout', 
          label: 'Dropout', 
          x: 600, 
          y: 380, 
          level: 2, 
          children: [], 
          color: '#F59E0B' 
        }
      ],
      createdAt: new Date().toISOString()
    }

    // Store mindmap in database
    const { data, error } = await supabaseClient
      .from('mindmaps')
      .insert([{
        id: mindmapData.id,
        document_id: mindmapData.documentId,
        title: mindmapData.title,
        nodes: mindmapData.nodes,
        created_at: mindmapData.createdAt
      }])

    if (error) {
      console.error('Database error:', error)
    }

    return new Response(
      JSON.stringify(mindmapData),
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