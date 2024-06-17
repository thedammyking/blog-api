import { body, param } from 'express-validator';
import { NextRequest, NextResponse } from 'next/server';

import { Sentry } from '@/lib/sentry';
import { validate } from '@/middleware/validation';

import { PostService } from '../services/postService';

const postService = new PostService();

export const getPostById = async (req: NextRequest) => {
  const { id } = req.nextUrl.searchParams;
  try {
    const post = await postService.getPostById(id as string);
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
};

export const createPost = [
  validate([
    body('title').notEmpty().withMessage('Title is required'),
    body('excerpt').notEmpty().withMessage('Excerpt is required'),
    body('body').notEmpty().withMessage('Body is required'),
    body('userId').isUUID().withMessage('User ID must be a valid UUID'),
    body('featuredImage').notEmpty().withMessage('Featured image is required')
  ]),
  async (req: NextRequest) => {
    try {
      const { title, excerpt, body, userId, featuredImage } = await req.json();
      const post = await postService.createPost({ title, excerpt, body, userId, featuredImage });
      return NextResponse.json({ success: true, data: post });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
];

export const updatePost = [
  validate([
    param('id').isUUID().withMessage('Post ID must be a valid UUID'),
    body('title').optional().notEmpty().withMessage('Title is required'),
    body('excerpt').optional().notEmpty().withMessage('Excerpt is required'),
    body('body').optional().notEmpty().withMessage('Body is required'),
    body('featuredImage').optional().notEmpty().withMessage('Featured image is required')
  ]),
  async (req: NextRequest) => {
    const { id } = req.nextUrl.searchParams;
    try {
      const { title, excerpt, body, featuredImage } = await req.json();
      const post = await postService.updatePost(id as string, {
        title,
        excerpt,
        body,
        featuredImage
      });
      return NextResponse.json({ success: true, data: post });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
];

export const deletePost = [
  validate([param('id').isUUID().withMessage('Post ID must be a valid UUID')]),
  async (req: NextRequest) => {
    const { id } = req.nextUrl.searchParams;
    try {
      const post = await postService.deletePost(id as string);
      return NextResponse.json({ success: true, data: post });
    } catch (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
];
