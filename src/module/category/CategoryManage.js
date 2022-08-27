import Swal from "sweetalert2";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { db } from "firebase-app/firebase-config";
import { categoryStatus, theme } from "utils/constants";

const CategoryManage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const colRef = collection(db, "categories");

    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        if (filter) {
          if (doc.data().name.includes(filter)) {
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
      setCategories(results);
    });
  }, [filter]);

  const handleFilterOnChange = debounce((e) => setFilter(e.target.value), 500);

  const handleUpdate = (categoryId) => {
    navigate(`/manage/update-category?id=${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    const deletedDocRef = doc(db, "categories", categoryId);

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
      <DashboardHeading title="Categories" desc="Manage your category">
        <div className="flex items-center gap-x-5">
          <input
            type="text"
            placeholder="Search category..."
            className="h-[52px] px-5 border-solid border-2 border-gray-300 focus:border-primary rounded-lg"
            onChange={handleFilterOnChange}
          ></input>
          <Button
            className="max-w-[200px]"
            variant="secondary"
            onClick={() => {
              navigate("/manage/add-category");
            }}
          >
            Create category
          </Button>
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <span className="italic text-gray-400">{category.slug}</span>
                </td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">APPROVED</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="warning">UNAPPROVED</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() => {
                        handleUpdate(category.id);
                      }}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => {
                        handleDelete(category.id);
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

export default CategoryManage;
