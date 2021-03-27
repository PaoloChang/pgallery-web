/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeeds
// ====================================================

export interface seeFeeds_seeFeeds_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeFeeds_seeFeeds_comments_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeFeeds_seeFeeds_comments {
  __typename: "Comment";
  id: number;
  user: seeFeeds_seeFeeds_comments_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}

export interface seeFeeds_seeFeeds {
  __typename: "Photo";
  id: number;
  image: string;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
  user: seeFeeds_seeFeeds_user;
  caption: string | null;
  comments: (seeFeeds_seeFeeds_comments | null)[] | null;
  createdAt: string;
  isMine: boolean;
}

export interface seeFeeds {
  seeFeeds: (seeFeeds_seeFeeds | null)[] | null;
}
