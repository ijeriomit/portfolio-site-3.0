import "./profile-image.scss";

export default function ProfileImage() {
  return (
    <div className="profile-image">
      <div className="profile-image__glow-ring" aria-hidden="true"></div>
      <img
        className="profile-image__photo"
        src={`${process.env.PUBLIC_URL}/assets/about-me-images/headshot.jpg`}
        alt="Ijeri Omitogun"
        loading="lazy"
      />
    </div>
  );
}
