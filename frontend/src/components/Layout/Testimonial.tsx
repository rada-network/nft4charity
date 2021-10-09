import ceoAvatar from '@/assets/images/ceoAvatar.png';
import designerAvatar from '@/assets/images/designerAvatar.png';
import quotesPng from '@/assets/images/quotes.png';

export const Testimonial = () => {
  return (
    <div className="bg-gray-100 w-full mt-20 p-10">
      <p className="m-auto w-full flex justify-center flex-none font-Merriweather font-bold text-4xl">
        Testimonials
      </p>
      <p className="font-Open text-sm w-2/3 m-auto mt-5 text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam,...
      </p>
      <div className="flex justify-center w-2/3 m-auto mt-10">
        <div className="flex mr-10">
          <div>
            <img src={quotesPng} alt="" />
          </div>
          <div className="ml-5 ">
            <span className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed euismod quis sit
              gravida pharetra sit. Cursus vel enim pretium vulputate semper sem elit magna neque.
              Aliquet adipisc
            </span>
            <div className="flex shadow-xl p-5 w-max rounded-full mt-5">
              <img src={designerAvatar} alt="" />
              <div className="ml-5 ">
                <p className="font-bold text-sm">@chiep | rada</p>
                <p className="italic text-sm">Contributor</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div>
            <img src={quotesPng} alt="" />
          </div>
          <div className="ml-5 ">
            <span className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed euismod quis sit
              gravida pharetra sit. Cursus vel enim pretium vulputate semper sem elit magna neque.
              Aliquet adipisc
            </span>
            <div className="flex shadow-xl p-5 w-max rounded-full mt-5">
              <img src={ceoAvatar} alt="" />
              <div className="ml-5">
                <p className="font-bold text-sm">@hung dinh | rada</p>
                <p className="italic text-sm">CEO Rada Charity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
