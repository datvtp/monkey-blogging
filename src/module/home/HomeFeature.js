import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";

import { Heading } from "components/layout";
import { PostFeatureItem } from "module/post";

const StyledHomeFeature = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("status", "==", 1));

    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);

  if (posts.length <= 0) return null;

  return (
    <StyledHomeFeature className="home-block">
      <div className="container">
        <Heading>Featured posts</Heading>
        <div className="grid-layout">
          {posts.length > 0 &&
            posts.map((post) => (
              <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
            ))}
        </div>
      </div>
    </StyledHomeFeature>
  );
};

export default HomeFeature;
