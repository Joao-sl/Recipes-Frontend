import { API_DOMAIN } from '@/lib/config';
import { NextRequest, NextResponse } from 'next/server';

type RouteHandlerProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: RouteHandlerProps) {
  const resolvedParams = await params;

  try {
    const response = await fetch(`${API_DOMAIN}/api/recipes/${resolvedParams.slug}/`, {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(await response.json(), { status: response.status });
    }

    const recipeData = await response.json();
    return NextResponse.json(recipeData);
  } catch {
    return NextResponse.json({ message: 'Server Connection Error' }, { status: 503 });
  }
}
