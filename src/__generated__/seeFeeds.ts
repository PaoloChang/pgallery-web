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

export interface seeFeeds_seeFeeds {
  __typename: "Photo";
  id: number;
  user: seeFeeds_seeFeeds_user;
  image: string;
  caption: string | null;
  likes: number;
  comments: number;
  createdAt: string;
  isMine: boolean;
  isLiked: boolean;
}

export interface seeFeeds {
  seeFeeds: (seeFeeds_seeFeeds | null)[] | null;
}
