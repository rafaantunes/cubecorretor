// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { usuarioEmail, usuarioSenha } = await req.json();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuarioEmail, usuarioSenha }),
    });

    if (!res.ok) {
      const { message } = await res.json();
      return NextResponse.json({ success: false, message }, { status: 401 });
    }

    const { access_token, usuarioNome, usuarioEmail: email, id } = await res.json();

    const response = NextResponse.json({
      success: true,
      access_token, 
      usuarioNome,
      usuarioEmail: email,
      usuarioId: id,
    });

    // Armazena o token no cookie HttpOnly também
    response.cookies.set('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return NextResponse.json({ success: false, message: 'Erro interno' }, { status: 500 });
  }
}
