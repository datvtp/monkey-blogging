import React, { useEffect, useState } from "react";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";

import { Table } from "components/table";
import { LabelStatus } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { ActionDelete, ActionEdit } from "components/action";
import { useNavigate } from "react-router-dom";
import { theme, userRole, userStatus } from "utils/constants";
import { Button } from "components/button";
import Swal from "sweetalert2";

const UserManage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "users");

    onSnapshot(colRef, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsers(results);
    });
  }, []);

  const handleUpdate = (userId) => {
    navigate(`/manage/update-user?id=${userId}`);
  };

  const handleDelete = async (user) => {
    const deletedDocRef = doc(db, "users", user.id);

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
      <DashboardHeading title="Users" desc="Manage your user">
        <div className="flex items-center gap-x-5">
          <Button
            className="max-w-[200px]"
            variant="secondary"
            onClick={() => {
              navigate("/manage/add-user");
            }}
          >
            Create user
          </Button>
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id.slice(0, 5) + "..."}</td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-10 h-10 object-cover rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3>{user.fullname}</h3>
                      <time className="text-sm text-gray-400">
                        {new Date(
                          user.createdAt.seconds * 1000
                        ).toLocaleDateString("vi-VN")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  {user.status === userStatus.ACTIVE && (
                    <LabelStatus type="success">ACTIVE</LabelStatus>
                  )}
                  {user.status === userStatus.BAN && (
                    <LabelStatus type="danger">BAN</LabelStatus>
                  )}
                  {user.status === userStatus.PENDING && (
                    <LabelStatus type="warning">PENDING</LabelStatus>
                  )}
                </td>
                <td>
                  {user.role === userRole.ADMIN && (
                    <div className="text-red-500">ADMIN</div>
                  )}
                  {user.role === userRole.MOD && (
                    <div className="text-green-500">MOD</div>
                  )}
                  {user.role === userRole.USER && (
                    <div className="text-orange-500">USER</div>
                  )}
                </td>
                <td>
                  <div className="flex items-center gap-x-3">
                    <ActionEdit
                      onClick={() => handleUpdate(user.id)}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDelete(user)}
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

export default UserManage;
