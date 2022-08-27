import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { categoryStatus } from "utils/constants";

const CategoryManage = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    });
  }, []);

  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button
          className="max-w-[200px]"
          variant="secondary"
          onClick={() => {
            navigate("/manage/add-category");
          }}
        >
          Create category
        </Button>
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
                    <LabelStatus type="danger">UNAPPROVED</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionView></ActionView>
                    <ActionEdit></ActionEdit>
                    <ActionDelete></ActionDelete>
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
