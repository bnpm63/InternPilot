import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Mock feedback for when OpenAI is rate limited
const mockFeedback = `Suggestion: Add more specific technical skills like "React", "Node.js", "Python", "Git" to improve ATS matching
Impact: Recruiters use keyword scanning to filter resumes, and specific tech skills increase your chances of passing initial screening
Action: Review the job description and add relevant programming languages, frameworks, and tools you've used

Suggestion: Quantify your project achievements with metrics and numbers
Impact: Specific metrics demonstrate your impact and make your projects more impressive to hiring managers
Action: Add numbers like "Improved performance by 40%", "Reduced load time by 2 seconds", "Handled 1000+ users"

Suggestion: Move your most relevant projects to the top of your experience section
Impact: Recruiters spend only 6-10 seconds scanning resumes, so leading with your best work is crucial
Action: Reorder projects to highlight those most relevant to the internship you're applying for

Suggestion: Add a brief summary or objective statement at the top
Impact: A clear summary helps recruiters quickly understand your background and career goals
Action: Write 2-3 sentences summarizing your technical background and what you're seeking in an internship

Suggestion: Include links to your GitHub, portfolio, or live projects
Impact: Demonstrating your actual code and projects gives recruiters concrete evidence of your skills
Action: Add GitHub profile link and ensure your best projects are well-documented and accessible`;

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

    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

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

    try {
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
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      console.error('Error details:', {
        message: openaiError instanceof Error ? openaiError.message : 'Unknown error',
        name: openaiError instanceof Error ? openaiError.name : 'Unknown',
        stack: openaiError instanceof Error ? openaiError.stack : 'No stack'
      });
      
      // If it's a rate limit error, return mock feedback instead
      if (openaiError instanceof Error && 
          (openaiError.message.includes('429') || 
           openaiError.message.includes('rate limit') ||
           openaiError.message.includes('quota') ||
           openaiError.message.includes('billing'))) {
        console.log('Rate limited - returning mock feedback');
        return NextResponse.json({ 
          feedback: mockFeedback,
          note: "Using demo feedback due to OpenAI rate limit. Add credits to get personalized feedback."
        });
      }
      
      // Re-throw other OpenAI errors
      throw openaiError;
    }

  } catch (error) {
    console.error('Error generating resume feedback:', error);
    
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