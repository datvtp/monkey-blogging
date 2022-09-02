import React, { useEffect, useState } from "react";

import { Table } from "components/table";
import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { debounce } from "lodash";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import Swal from "sweetalert2";
import { postStatus, theme } from "utils/constants";
import { LabelStatus } from "components/label";

const PostManage = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState("");
  const handleFilterOnChange = debounce((e) => setFilter(e.target.value), 500);

  useEffect(() => {
    const colRef = collection(db, "posts");

    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        if (filter) {
          if (doc.data().title.includes(filter)) {
            results.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        } else {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        }
      });
      setPosts(results);
    });
  }, [filter]);

  const handleDelete = async (postId) => {
    const deletedDocRef = doc(db, "posts", postId);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.primary,
      cancelButtonColor: theme.grey6B,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(deletedDocRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <DashboardHeading title="All posts" desc="Manage all posts">
        <div className="flex items-center gap-x-5">
          <input
            type="text"
            placeholder="Search post..."
            className="h-[52px] px-5 border-solid border-2 border-gray-300 focus:border-primary rounded-lg"
            onChange={handleFilterOnChange}
          ></input>
          <Button
            className="max-w-[200px]"
            variant="secondary"
            onClick={() => {
              navigate("/manage/add-post");
            }}
          >
            Create post
          </Button>
        </div>
      </DashboardHeading>

      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 &&
            posts.map((post) => (
              <tr>
                <td>{post.id.slice(0, 5)}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={post.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {post.title.length > 25
                          ? post.title.slice(0, 25) + "..."
                          : post.title}
                      </h3>
                      <time className="text-sm text-gray-500">
                        {new Date(
                          post.createdAt.seconds * 1000
                        ).toLocaleDateString("vi-VN")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.category.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.user.fullname}</span>
                </td>
                <td>
                  {post.status === postStatus.APPROVED && (
                    <LabelStatus type="success">APPROVED</LabelStatus>
                  )}
                  {post.status === postStatus.PENDING && (
                    <LabelStatus type="warning">PENDING</LabelStatus>
                  )}
                  {post.status === postStatus.REJECTED && (
                    <LabelStatus type="danger">REJECTED</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView
                      onClick={() => {
                        navigate(`/${post.slug}`);
                      }}
                    ></ActionView>
                    <ActionEdit
                      onClick={() => {
                        navigate(`/manage/update-post?id=${post.id}`);
                      }}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => {
                        handleDelete(post.id);
                      }}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostManage;
