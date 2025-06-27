import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
});

export async function POST(request: NextRequest) {
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Check if project ID is available for project API keys
    if (process.env.OPENAI_API_KEY.startsWith('sk-proj-') && !process.env.OPENAI_PROJECT_ID) {
      console.error('Project ID is required for project API keys');
      return NextResponse.json(
        { error: 'Project ID is required for project API keys' },
        { status: 500 }
      );
    }

    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    console.log('=== OpenAI Configuration Debug ===');
    console.log('API Key starts with sk-proj-:', process.env.OPENAI_API_KEY.startsWith('sk-proj-'));
    console.log('API Key first 20 chars:', process.env.OPENAI_API_KEY.substring(0, 20) + '...');
    console.log('Project ID:', process.env.OPENAI_PROJECT_ID);
    console.log('Project ID length:', process.env.OPENAI_PROJECT_ID?.length);
    console.log('================================');

    console.log('Processing resume feedback request...');

    const prompt = `Analyze this resume for a computer science internship application and provide concise, actionable feedback. Focus on:

1. Technical skills alignment with CS internships
2. Project descriptions and impact
3. Keywords and ATS optimization
4. Overall structure and presentation

Resume:
${resumeText}

Provide 3-5 specific, actionable suggestions in this format:
- Suggestion: [specific feedback]
- Impact: [why this matters for CS internships]
- Action: [what to change/add]`;

    console.log('Sending request to OpenAI...');

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a career advisor specializing in computer science internships. Provide clear, actionable feedback that helps students improve their resumes for tech internships."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log('Received response from OpenAI');

    const feedback = completion.choices[0]?.message?.content || 'No feedback generated';

    return NextResponse.json({ feedback });

  } catch (error) {
    console.error('=== Error Details ===');
    console.error('Error generating resume feedback:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error name:', error.name);
      console.error('Error stack:', error.stack);
    }
    
    console.error('Full error object:', JSON.stringify(error, null, 2));
    console.error('====================');
    
    // More specific error handling
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        return NextResponse.json(
          { error: 'Invalid API key. Please check your OpenAI API key.' },
          { status: 401 }
        );
      } else if (error.message.includes('429')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      } else if (error.message.includes('500')) {
        return NextResponse.json(
          { error: 'OpenAI service error. Please try again later.' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to generate feedback. Please try again.' },
      { status: 500 }
    );
  }
} 