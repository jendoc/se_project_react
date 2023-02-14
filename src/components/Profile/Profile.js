import "./Profile.css";
import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  currentUser,
  clothingItems,
  handleCardClick,
  handleLikeClick,
  openAddModal,
  openEditModal,
  isLoggedIn,
  handleLogout,
}) {
  const myClothes = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="profile">
      <SideBar
        currentUser={currentUser}
        handleLogout={handleLogout}
        openEditModal={openEditModal}
      />
      <ClothesSection
        clothingItems={myClothes}
        handleCardClick={handleCardClick}
        openAddModal={openAddModal}
        isLoggedIn={isLoggedIn}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
}

export default Profile;
