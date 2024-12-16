import about1 from "../../../assets/about1.png";
import about2 from "../../../assets/about2.png";

const UserAbout = () => {
  return (
    <div className="bg-black text-white p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Text Content */}
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="mb-4">
            At JD Restaurant, we are dedicated to offering a refined and
            unforgettable dining experience, where the art of Japanese cuisine
            meets luxury and romance. Our mission is to create an atmosphere
            where guests can escape the everyday and immerse themselves in a
            world of exquisite flavors, delicate aromas, and impeccable service.
            Whether youre here for a special celebration, a romantic evening, or
            simply to indulge in the finest Japanese dishes, JD Restaurant is
            the perfect destination.
          </p>
          <p className="mb-4">
            We pride ourselves on delivering an authentic culinary experience
            that honors Japan’s rich food heritage while offering a modern
            twist. Our chefs are highly skilled, using only the freshest
            ingredients to create dishes that are both visually stunning and
            mouthwateringly delicious.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Core Values:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Authenticity:</strong> We honor traditional Japanese
              recipes while incorporating creative, contemporary touches.
            </li>
            <li>
              <strong>Exquisite Presentation:</strong> Each dish is carefully
              crafted to be a feast for both the eyes and the palate.
            </li>
            <li>
              <strong>Luxurious Ambiance:</strong> A sophisticated and intimate
              setting designed for romantic dinners, celebrations, and memorable
              evenings.
            </li>
            <li>
              <strong>Impeccable Service:</strong> Our attentive and
              professional team is dedicated to making every guest feel special.
            </li>
            <li>
              <strong>Fresh Ingredients:</strong> We source only the highest
              quality, fresh ingredients to ensure every meal exceeds
              expectations.
            </li>
            <li>
              <strong>Exclusive Experience:</strong> Private dining options are
              available for those seeking an intimate and personalized
              experience.
            </li>
          </ul>
          <p className="mt-6">
            At JD Restaurant, we believe dining is more than just a meal – its a
            journey of the senses, an experience that leaves lasting memories.
          </p>
        </div>

        {/* Image Content */}
        <div className="space-y-6">
          <img
            src={about1}
            alt="Dining Area"
            className="w-full h-auto rounded-lg"
          />
          <img
            src={about2}
            alt="Luxurious Ambiance"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default UserAbout;
