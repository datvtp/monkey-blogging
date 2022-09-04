import styled from "styled-components";
import React, { useEffect, useState } from "react";
import PostMeta from "module/post/PostMeta";
import PostImage from "module/post/PostImage";
import PostCategory from "module/post/PostCategory";
import parse from "html-react-parser";
import PageNotFound from "./PageNotFound";
import Main from "components/layout/Main";
import { useParams } from "react-router-dom";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const StyledPostDetailsPage = styled.div`
  padding-bottom: 100px;

  .post {
    &-header {
      gap: 40px;
      margin: 60px 0;
    }

    &-feature {
      width: 100%;
      max-width: 700px;
      height: 350px;
      border-radius: 20px;
    }

    &-heading {
      font-weight: bold;
      font-size: 36px;
    }

    &-info {
      flex: 1;
    }

    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }

  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }

    fetchData();
  }, [slug]);

  if (!slug || !postInfo.title) return <PageNotFound></PageNotFound>;

  return (
    <StyledPostDetailsPage>
      <Main>
        <div className="container">
          <div className="post-content">
            <div className="post-header">
              <PostImage
                url={postInfo.image}
                className="post-feature"
              ></PostImage>
              <div className="post-info mt-5">
                <div className="flex items-center">
                  <h1 className="post-heading">{postInfo.title}</h1>
                  <div>
                    <PostCategory className="ml-2">
                      {postInfo.category.name}
                    </PostCategory>
                  </div>
                </div>
                <PostMeta className="mt-3"></PostMeta>
              </div>
            </div>
            <div className="entry-content">{parse(postInfo.content || "")}</div>
          </div>
        </div>
      </Main>
    </StyledPostDetailsPage>
  );
};

export default PostDetailsPage;
