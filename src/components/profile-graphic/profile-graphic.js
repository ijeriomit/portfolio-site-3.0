import "./profile-graphic.scss";

export default function ProfileGraphic() {
  return (
    <div className="profile-graphic" aria-hidden="true">
      <img
        className="profile-graphic__image"
        src={`${process.env.PUBLIC_URL}/assets/clip-art-images/memoji-laptop.svg`}
        alt=""
      />
    </div>
  );
}
