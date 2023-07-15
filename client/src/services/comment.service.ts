import { ICommentWithUser, ICreateCommentForm } from '@/types/comment.types';
import { IResponseCommentsByUser } from '@/types/responses.types';

import { api, IPaginationArg } from './api';

interface IGetCommentsForPostArg extends IPaginationArg {
  id: string;
}

interface ICreateCommentArg extends ICreateCommentForm {
  id: string;
  accessToken: string;
}

const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<IResponseCommentsByUser, IGetCommentsForPostArg>({
      query: ({ id, page = 1, limit = 5 }) => ({
        url: `comments/${id}?page=${page}&limit=${limit}`,
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.comments.map(({ id }) => ({ type: 'post' as const, id })),
              'post',
              { type: 'post', id: arg.id },
            ]
          : ['comment', { type: 'post', id: arg.id }],
    }),
    createComment: builder.mutation<ICommentWithUser, ICreateCommentArg>({
      query: ({ id, accessToken, text }) => ({
        url: `comments/${id}`,
        method: 'POST',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: {
          text,
        },
      }),
      invalidatesTags: (result, error, arg) =>
        result
          ? [
              { type: 'comment', id: result.id },
              { type: 'post', id: arg.id },
            ]
          : ['comment', { type: 'post', id: arg.id }],
    }),
  }),
});

export const { useGetCommentsQuery, useCreateCommentMutation } = commentApi;
