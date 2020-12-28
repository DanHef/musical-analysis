import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};



export type AnalysisSession = {
  __typename?: 'AnalysisSession';
  assignees?: Maybe<Array<User>>;
  id: Scalars['ID'];
  moderator?: Maybe<User>;
  name: Scalars['String'];
  parts?: Maybe<Array<Part>>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
};


export type AnalysisSessionAssigneesArgs = {
  filter?: Maybe<UserFilter>;
  paging?: Maybe<OffsetPaging>;
  sorting?: Maybe<Array<UserSort>>;
};


export type AnalysisSessionPartsArgs = {
  filter?: Maybe<PartFilter>;
  paging?: Maybe<OffsetPaging>;
  sorting?: Maybe<Array<PartSort>>;
};

export type AnalysisSessionAvgAggregate = {
  __typename?: 'AnalysisSessionAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type AnalysisSessionCountAggregate = {
  __typename?: 'AnalysisSessionCountAggregate';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  started?: Maybe<Scalars['Int']>;
  stopped?: Maybe<Scalars['Int']>;
};

export type AnalysisSessionDeleteFilter = {
  and?: Maybe<Array<AnalysisSessionDeleteFilter>>;
  id?: Maybe<IdFilterComparison>;
  name?: Maybe<StringFieldComparison>;
  or?: Maybe<Array<AnalysisSessionDeleteFilter>>;
  started?: Maybe<DateFieldComparison>;
  stopped?: Maybe<DateFieldComparison>;
};

export type AnalysisSessionDeleteResponse = {
  __typename?: 'AnalysisSessionDeleteResponse';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
};

export type AnalysisSessionFilter = {
  and?: Maybe<Array<AnalysisSessionFilter>>;
  id?: Maybe<IdFilterComparison>;
  name?: Maybe<StringFieldComparison>;
  or?: Maybe<Array<AnalysisSessionFilter>>;
  started?: Maybe<DateFieldComparison>;
  stopped?: Maybe<DateFieldComparison>;
};

export type AnalysisSessionMaxAggregate = {
  __typename?: 'AnalysisSessionMaxAggregate';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
};

export type AnalysisSessionMinAggregate = {
  __typename?: 'AnalysisSessionMinAggregate';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
};

export type AnalysisSessionSort = {
  direction: SortDirection;
  field: AnalysisSessionSortFields;
  nulls?: Maybe<SortNulls>;
};

export enum AnalysisSessionSortFields {
  Id = 'id',
  Name = 'name',
  Started = 'started',
  Stopped = 'stopped'
}

export type AnalysisSessionSumAggregate = {
  __typename?: 'AnalysisSessionSumAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type AnalysisSessionUpdateFilter = {
  and?: Maybe<Array<AnalysisSessionUpdateFilter>>;
  id?: Maybe<IdFilterComparison>;
  name?: Maybe<StringFieldComparison>;
  or?: Maybe<Array<AnalysisSessionUpdateFilter>>;
  started?: Maybe<DateFieldComparison>;
  stopped?: Maybe<DateFieldComparison>;
};

export type BooleanFieldComparison = {
  is?: Maybe<Scalars['Boolean']>;
  isNot?: Maybe<Scalars['Boolean']>;
};

export type CreateAnalysisSession = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
};

export type CreateManyAnalysisSessionsInput = {
  /** Array of records to create */
  analysisSessions: Array<CreateAnalysisSession>;
};

export type CreateManyPartsInput = {
  /** Array of records to create */
  parts: Array<CreatePart>;
};

export type CreateManyTagsInput = {
  /** Array of records to create */
  tags: Array<CreateTag>;
};

export type CreateManyUsersInput = {
  /** Array of records to create */
  users: Array<CreateUser>;
};

export type CreateOneAnalysisSessionInput = {
  /** The record to create */
  analysisSession: CreateAnalysisSession;
};

export type CreateOnePartInput = {
  /** The record to create */
  part: CreatePart;
};

export type CreateOneTagInput = {
  /** The record to create */
  tag: CreateTag;
};

export type CreateOneUserInput = {
  /** The record to create */
  user: CreateUser;
};

export type CreatePart = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
  submitted?: Maybe<Scalars['Boolean']>;
};

export type CreateTag = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type CreateUser = {
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type DateFieldComparison = {
  between?: Maybe<DateFieldComparisonBetween>;
  eq?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  is?: Maybe<Scalars['Boolean']>;
  isNot?: Maybe<Scalars['Boolean']>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  neq?: Maybe<Scalars['DateTime']>;
  notBetween?: Maybe<DateFieldComparisonBetween>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime'];
  upper: Scalars['DateTime'];
};


export type DeleteManyAnalysisSessionsInput = {
  /** Filter to find records to delete */
  filter: AnalysisSessionDeleteFilter;
};

export type DeleteManyPartsInput = {
  /** Filter to find records to delete */
  filter: PartDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int'];
};

export type DeleteManyTagsInput = {
  /** Filter to find records to delete */
  filter: TagDeleteFilter;
};

export type DeleteManyUsersInput = {
  /** Filter to find records to delete */
  filter: UserDeleteFilter;
};

export type DeleteOneInput = {
  /** The id of the record to delete. */
  id: Scalars['ID'];
};

export type IdFilterComparison = {
  eq?: Maybe<Scalars['ID']>;
  gt?: Maybe<Scalars['ID']>;
  gte?: Maybe<Scalars['ID']>;
  iLike?: Maybe<Scalars['ID']>;
  in?: Maybe<Array<Scalars['ID']>>;
  is?: Maybe<Scalars['Boolean']>;
  isNot?: Maybe<Scalars['Boolean']>;
  like?: Maybe<Scalars['ID']>;
  lt?: Maybe<Scalars['ID']>;
  lte?: Maybe<Scalars['ID']>;
  neq?: Maybe<Scalars['ID']>;
  notILike?: Maybe<Scalars['ID']>;
  notIn?: Maybe<Array<Scalars['ID']>>;
  notLike?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAssigneesToAnalysisSession: AnalysisSession;
  addPartsToAnalysisSession: AnalysisSession;
  addPartsToUser: User;
  createManyAnalysisSessions: Array<AnalysisSession>;
  createManyParts: Array<Part>;
  createManyTags: Array<Tag>;
  createManyUsers: Array<User>;
  createOneAnalysisSession: AnalysisSession;
  createOnePart: Part;
  createOneTag: Tag;
  createOneUser: User;
  deleteManyAnalysisSessions: DeleteManyResponse;
  deleteManyParts: DeleteManyResponse;
  deleteManyTags: DeleteManyResponse;
  deleteManyUsers: DeleteManyResponse;
  deleteOneAnalysisSession: AnalysisSessionDeleteResponse;
  deleteOnePart: PartDeleteResponse;
  deleteOneTag: TagDeleteResponse;
  deleteOneUser: UserDeleteResponse;
  removeAnalysisSessionFromPart: Part;
  removeAssigneesFromAnalysisSession: AnalysisSession;
  removeModeratorFromAnalysisSession: AnalysisSession;
  removePartsFromAnalysisSession: AnalysisSession;
  removePartsFromUser: User;
  removeUserFromPart: Part;
  setAnalysisSessionOnPart: Part;
  setModeratorOnAnalysisSession: AnalysisSession;
  setUserOnPart: Part;
  syncUsers: Array<User>;
  updateManyAnalysisSessions: UpdateManyResponse;
  updateManyParts: UpdateManyResponse;
  updateManyTags: UpdateManyResponse;
  updateManyUsers: UpdateManyResponse;
  updateOneAnalysisSession: AnalysisSession;
  updateOnePart: Part;
  updateOneTag: Tag;
  updateOneUser: User;
};


export type MutationAddAssigneesToAnalysisSessionArgs = {
  input: RelationsInput;
};


export type MutationAddPartsToAnalysisSessionArgs = {
  input: RelationsInput;
};


export type MutationAddPartsToUserArgs = {
  input: RelationsInput;
};


export type MutationCreateManyAnalysisSessionsArgs = {
  input: CreateManyAnalysisSessionsInput;
};


export type MutationCreateManyPartsArgs = {
  input: CreateManyPartsInput;
};


export type MutationCreateManyTagsArgs = {
  input: CreateManyTagsInput;
};


export type MutationCreateManyUsersArgs = {
  input: CreateManyUsersInput;
};


export type MutationCreateOneAnalysisSessionArgs = {
  input: CreateOneAnalysisSessionInput;
};


export type MutationCreateOnePartArgs = {
  input: CreateOnePartInput;
};


export type MutationCreateOneTagArgs = {
  input: CreateOneTagInput;
};


export type MutationCreateOneUserArgs = {
  input: CreateOneUserInput;
};


export type MutationDeleteManyAnalysisSessionsArgs = {
  input: DeleteManyAnalysisSessionsInput;
};


export type MutationDeleteManyPartsArgs = {
  input: DeleteManyPartsInput;
};


export type MutationDeleteManyTagsArgs = {
  input: DeleteManyTagsInput;
};


export type MutationDeleteManyUsersArgs = {
  input: DeleteManyUsersInput;
};


export type MutationDeleteOneAnalysisSessionArgs = {
  input: DeleteOneInput;
};


export type MutationDeleteOnePartArgs = {
  input: DeleteOneInput;
};


export type MutationDeleteOneTagArgs = {
  input: DeleteOneInput;
};


export type MutationDeleteOneUserArgs = {
  input: DeleteOneInput;
};


export type MutationRemoveAnalysisSessionFromPartArgs = {
  input: RelationInput;
};


export type MutationRemoveAssigneesFromAnalysisSessionArgs = {
  input: RelationsInput;
};


export type MutationRemoveModeratorFromAnalysisSessionArgs = {
  input: RelationInput;
};


export type MutationRemovePartsFromAnalysisSessionArgs = {
  input: RelationsInput;
};


export type MutationRemovePartsFromUserArgs = {
  input: RelationsInput;
};


export type MutationRemoveUserFromPartArgs = {
  input: RelationInput;
};


export type MutationSetAnalysisSessionOnPartArgs = {
  input: RelationInput;
};


export type MutationSetModeratorOnAnalysisSessionArgs = {
  input: RelationInput;
};


export type MutationSetUserOnPartArgs = {
  input: RelationInput;
};


export type MutationSyncUsersArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateManyAnalysisSessionsArgs = {
  input: UpdateManyAnalysisSessionsInput;
};


export type MutationUpdateManyPartsArgs = {
  input: UpdateManyPartsInput;
};


export type MutationUpdateManyTagsArgs = {
  input: UpdateManyTagsInput;
};


export type MutationUpdateManyUsersArgs = {
  input: UpdateManyUsersInput;
};


export type MutationUpdateOneAnalysisSessionArgs = {
  input: UpdateOneAnalysisSessionInput;
};


export type MutationUpdateOnePartArgs = {
  input: UpdateOnePartInput;
};


export type MutationUpdateOneTagArgs = {
  input: UpdateOneTagInput;
};


export type MutationUpdateOneUserArgs = {
  input: UpdateOneUserInput;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: Maybe<Scalars['Int']>;
  /** Offset to start returning records from */
  offset?: Maybe<Scalars['Int']>;
};

export type Part = {
  __typename?: 'Part';
  analysisSession?: Maybe<AnalysisSession>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
  submitted: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type PartAvgAggregate = {
  __typename?: 'PartAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type PartCountAggregate = {
  __typename?: 'PartCountAggregate';
  description?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  started?: Maybe<Scalars['Int']>;
  stopped?: Maybe<Scalars['Int']>;
  submitted?: Maybe<Scalars['Int']>;
};

export type PartDeleteFilter = {
  and?: Maybe<Array<PartDeleteFilter>>;
  description?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  or?: Maybe<Array<PartDeleteFilter>>;
  started?: Maybe<DateFieldComparison>;
  stopped?: Maybe<DateFieldComparison>;
  submitted?: Maybe<BooleanFieldComparison>;
};

export type PartDeleteResponse = {
  __typename?: 'PartDeleteResponse';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
  submitted?: Maybe<Scalars['Boolean']>;
};

export type PartFilter = {
  and?: Maybe<Array<PartFilter>>;
  description?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  or?: Maybe<Array<PartFilter>>;
  started?: Maybe<DateFieldComparison>;
  stopped?: Maybe<DateFieldComparison>;
  submitted?: Maybe<BooleanFieldComparison>;
};

export type PartMaxAggregate = {
  __typename?: 'PartMaxAggregate';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
};

export type PartMinAggregate = {
  __typename?: 'PartMinAggregate';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
};

export type PartSort = {
  direction: SortDirection;
  field: PartSortFields;
  nulls?: Maybe<SortNulls>;
};

export enum PartSortFields {
  Description = 'description',
  Id = 'id',
  Started = 'started',
  Stopped = 'stopped',
  Submitted = 'submitted'
}

export type PartSumAggregate = {
  __typename?: 'PartSumAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type PartUpdateFilter = {
  and?: Maybe<Array<PartUpdateFilter>>;
  description?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  or?: Maybe<Array<PartUpdateFilter>>;
  started?: Maybe<DateFieldComparison>;
  stopped?: Maybe<DateFieldComparison>;
  submitted?: Maybe<BooleanFieldComparison>;
};

export type Query = {
  __typename?: 'Query';
  analysisSession?: Maybe<AnalysisSession>;
  analysisSessions: Array<AnalysisSession>;
  part?: Maybe<Part>;
  parts: Array<Part>;
  tag?: Maybe<Tag>;
  tags: Array<Tag>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAnalysisSessionArgs = {
  id: Scalars['ID'];
};


export type QueryAnalysisSessionsArgs = {
  filter?: Maybe<AnalysisSessionFilter>;
  paging?: Maybe<OffsetPaging>;
  sorting?: Maybe<Array<AnalysisSessionSort>>;
};


export type QueryPartArgs = {
  id: Scalars['ID'];
};


export type QueryPartsArgs = {
  filter?: Maybe<PartFilter>;
  paging?: Maybe<OffsetPaging>;
  sorting?: Maybe<Array<PartSort>>;
};


export type QueryTagArgs = {
  id: Scalars['ID'];
};


export type QueryTagsArgs = {
  filter?: Maybe<TagFilter>;
  paging?: Maybe<OffsetPaging>;
  sorting?: Maybe<Array<TagSort>>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  filter?: Maybe<UserFilter>;
  paging?: Maybe<OffsetPaging>;
  sorting?: Maybe<Array<UserSort>>;
};

export type RelationInput = {
  /** The id of the record. */
  id: Scalars['ID'];
  /** The id of relation. */
  relationId: Scalars['ID'];
};

export type RelationsInput = {
  /** The id of the record. */
  id: Scalars['ID'];
  /** The ids of the relations. */
  relationIds: Array<Scalars['ID']>;
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type StringFieldComparison = {
  eq?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  iLike?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  is?: Maybe<Scalars['Boolean']>;
  isNot?: Maybe<Scalars['Boolean']>;
  like?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  neq?: Maybe<Scalars['String']>;
  notILike?: Maybe<Scalars['String']>;
  notIn?: Maybe<Array<Scalars['String']>>;
  notLike?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type TagAvgAggregate = {
  __typename?: 'TagAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type TagCountAggregate = {
  __typename?: 'TagCountAggregate';
  description?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

export type TagDeleteFilter = {
  and?: Maybe<Array<TagDeleteFilter>>;
  description?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  or?: Maybe<Array<TagDeleteFilter>>;
};

export type TagDeleteResponse = {
  __typename?: 'TagDeleteResponse';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type TagFilter = {
  and?: Maybe<Array<TagFilter>>;
  description?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  or?: Maybe<Array<TagFilter>>;
};

export type TagMaxAggregate = {
  __typename?: 'TagMaxAggregate';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type TagMinAggregate = {
  __typename?: 'TagMinAggregate';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type TagSort = {
  direction: SortDirection;
  field: TagSortFields;
  nulls?: Maybe<SortNulls>;
};

export enum TagSortFields {
  Description = 'description',
  Id = 'id'
}

export type TagSumAggregate = {
  __typename?: 'TagSumAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type TagUpdateFilter = {
  and?: Maybe<Array<TagUpdateFilter>>;
  description?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  or?: Maybe<Array<TagUpdateFilter>>;
};

export type UpdateAnalysisSession = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
};

export type UpdateManyAnalysisSessionsInput = {
  /** Filter used to find fields to update */
  filter: AnalysisSessionUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateAnalysisSession;
};

export type UpdateManyPartsInput = {
  /** Filter used to find fields to update */
  filter: PartUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdatePart;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int'];
};

export type UpdateManyTagsInput = {
  /** Filter used to find fields to update */
  filter: TagUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTag;
};

export type UpdateManyUsersInput = {
  /** Filter used to find fields to update */
  filter: UserUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateUser;
};

export type UpdateOneAnalysisSessionInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateAnalysisSession;
};

export type UpdateOnePartInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdatePart;
};

export type UpdateOneTagInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateTag;
};

export type UpdateOneUserInput = {
  /** The id of the record to update */
  id: Scalars['ID'];
  /** The update to apply. */
  update: UpdateUser;
};

export type UpdatePart = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  started?: Maybe<Scalars['DateTime']>;
  stopped?: Maybe<Scalars['DateTime']>;
  submitted?: Maybe<Scalars['Boolean']>;
};

export type UpdateTag = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

export type UpdateUser = {
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastname?: Maybe<Scalars['String']>;
  parts?: Maybe<Array<Part>>;
  username?: Maybe<Scalars['String']>;
};


export type UserPartsArgs = {
  filter?: Maybe<PartFilter>;
  paging?: Maybe<OffsetPaging>;
  sorting?: Maybe<Array<PartSort>>;
};

export type UserAvgAggregate = {
  __typename?: 'UserAvgAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type UserCountAggregate = {
  __typename?: 'UserCountAggregate';
  email?: Maybe<Scalars['Int']>;
  firstname?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  lastname?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['Int']>;
};

export type UserDeleteFilter = {
  and?: Maybe<Array<UserDeleteFilter>>;
  email?: Maybe<StringFieldComparison>;
  firstname?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  lastname?: Maybe<StringFieldComparison>;
  or?: Maybe<Array<UserDeleteFilter>>;
  username?: Maybe<StringFieldComparison>;
};

export type UserDeleteResponse = {
  __typename?: 'UserDeleteResponse';
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserFilter = {
  and?: Maybe<Array<UserFilter>>;
  email?: Maybe<StringFieldComparison>;
  firstname?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  lastname?: Maybe<StringFieldComparison>;
  or?: Maybe<Array<UserFilter>>;
  username?: Maybe<StringFieldComparison>;
};

export type UserMaxAggregate = {
  __typename?: 'UserMaxAggregate';
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserMinAggregate = {
  __typename?: 'UserMinAggregate';
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastname?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserSort = {
  direction: SortDirection;
  field: UserSortFields;
  nulls?: Maybe<SortNulls>;
};

export enum UserSortFields {
  Email = 'email',
  Firstname = 'firstname',
  Id = 'id',
  Lastname = 'lastname',
  Username = 'username'
}

export type UserSumAggregate = {
  __typename?: 'UserSumAggregate';
  id?: Maybe<Scalars['Float']>;
};

export type UserUpdateFilter = {
  and?: Maybe<Array<UserUpdateFilter>>;
  email?: Maybe<StringFieldComparison>;
  firstname?: Maybe<StringFieldComparison>;
  id?: Maybe<IdFilterComparison>;
  lastname?: Maybe<StringFieldComparison>;
  or?: Maybe<Array<UserUpdateFilter>>;
  username?: Maybe<StringFieldComparison>;
};

export type AllAnalysisSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAnalysisSessionsQuery = (
  { __typename?: 'Query' }
  & { analysisSessions: Array<(
    { __typename?: 'AnalysisSession' }
    & Pick<AnalysisSession, 'id' | 'name' | 'started' | 'stopped'>
  )> }
);

export type OneAnalysisSessionQueryVariables = Exact<{
  analysisSessionId: Scalars['ID'];
}>;


export type OneAnalysisSessionQuery = (
  { __typename?: 'Query' }
  & { analysisSession?: Maybe<(
    { __typename?: 'AnalysisSession' }
    & Pick<AnalysisSession, 'id' | 'name' | 'started' | 'stopped'>
  )> }
);

export const AllAnalysisSessionsDocument = gql`
    query allAnalysisSessions {
  analysisSessions {
    id
    name
    started
    stopped
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AllAnalysisSessionsGQL extends Apollo.Query<AllAnalysisSessionsQuery, AllAnalysisSessionsQueryVariables> {
    document = AllAnalysisSessionsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OneAnalysisSessionDocument = gql`
    query OneAnalysisSession($analysisSessionId: ID!) {
  analysisSession(id: $analysisSessionId) {
    id
    name
    started
    stopped
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class OneAnalysisSessionGQL extends Apollo.Query<OneAnalysisSessionQuery, OneAnalysisSessionQueryVariables> {
    document = OneAnalysisSessionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }