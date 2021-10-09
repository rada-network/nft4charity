export const Landing = () => {
  return (
    <>
      <div className="container">
        <div className="grid md:grid-cols-2">
          <div className="bg-yellow-100 border-solid pl-10 pt-5">
            <p className="font-bold text-4xl">You can donate with your cryptocurrency</p>
            <p className="pt-5">
              Raise $1M worth of medical device & vacine for covid-19 in Ho Chi Minh City. Donate
              easy to public wallets.
            </p>
            <p>Campaign start 20.10.2021</p>
            <p>Total amount raised</p>
            <p>$962.000</p>
          </div>
          <div className="bg-yellow-100">
            <img
              className="ml-auto mr-auto"
              style={{ width: '300px', height: '300px' }}
              alt=""
              src="https://i2.wp.com/allpcworlds.com/wp-content/uploads/2021/08/Crypto-Donation.png?resize=256%2C256&ssl=1"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3">
          <div className="p-10 text-center justify-center">
            <img
              className="ml-auto mr-auto"
              style={{ width: '50px', height: '50px' }}
              alt=""
              src="https://i2.wp.com/allpcworlds.com/wp-content/uploads/2021/08/Crypto-Donation.png?resize=256%2C256&ssl=1"
            />
            <p className="font-bold">Transparent</p>
            <p className="text-center">Maximum privacy protection for dornors</p>
          </div>
          <div className="p-10 text-center justify-center">
            <img
              className="ml-auto mr-auto"
              style={{ width: '50px', height: '50px' }}
              alt=""
              src="https://i2.wp.com/allpcworlds.com/wp-content/uploads/2021/08/Crypto-Donation.png?resize=256%2C256&ssl=1"
            />
            <p className="font-bold">Easy to donate</p>
            <p className="text-center">Via Meta Mask or Binance Wallet</p>
          </div>
          <div className="p-10 text-center">
            <img
              className="ml-auto mr-auto"
              style={{ width: '50px', height: '50px' }}
              alt=""
              src="https://i2.wp.com/allpcworlds.com/wp-content/uploads/2021/08/Crypto-Donation.png?resize=256%2C256&ssl=1"
            />
            <p className="font-bold">Fun</p>
            <p className="text-center">Own an NFT,forever engraved on the blockchains</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="p-1 text-center border-black border-2 rounded-3xl">
            <img
              className="ml-auto mr-auto"
              alt=""
              src="https://i1-giadinh.vnecdn.net/2021/09/18/A-nh-1-jpeg-6294-1631969697.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=QD_6upT-jJgEpQIupxgrNQ"
            />
          </div>
          <div className="p-5">
            <p className="text-center font-bold text-4xl">
              T&T Group trao 3.000 suất quà cho người khó khăn tại Hà Nội
            </p>
            <p>
              Theo đó, mỗi hộ dân khó khăn của 16 phường thuộc 6 quận, huyện, thị xã trên địa bàn Hà
              Nội sẽ nhận được một suất quà trị giá 300.000 đồng, bao gồm các mặt hàng lương thực,
              thực phẩm thiết yếu như gạo, nước mắm, dầu ăn, đường, bột canh...
            </p>
            <button className="bg-deeppurple-600 text-white p-1 mt-10">View campaign</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-80 mt-10">
          <div
            className="p-5 justify-center text-center border-black border-2 rounded-3xl"
            style={{ height: '400px' }}
          >
            <img
              className="ml-auto mr-auto"
              style={{ height: '150px' }}
              alt=""
              src="https://d3f5j9upkzs19s.cloudfront.net/wp-content/uploads/2021/07/binance.jpg"
            />
            <p className="pt-20">Donate your cryptocurrency to public wallet</p>
            <button className="bg-deeppurple-600 text-white p-1 mt-10">By cryptocurrency</button>
          </div>
          <div
            className="p-5 text-center border-black border-2 rounded-3xl"
            style={{ height: '400px' }}
          >
            <img
              className="ml-auto mr-auto"
              style={{ height: '150px' }}
              alt=""
              src="https://cryptovn.io/wp-content/uploads/2019/04/binance-bnb-bitcoin.png"
            />
            <p className="pt-20">Donate your cryptocurrency to public wallet</p>
            <button className="bg-deeppurple-600 text-white p-1 mt-10">
              Mint your donation NFT
            </button>
          </div>
          <div
            className="p-5 text-center border-black border-2 rounded-3xl"
            style={{ height: '400px' }}
          >
            <img
              className="ml-auto mr-auto"
              style={{ height: '150px' }}
              alt=""
              src="https://d3f5j9upkzs19s.cloudfront.net/wp-content/uploads/2021/07/binance.jpg"
            />
            <p className="pt-20">Art Auction for Good</p>
            <button className="bg-deeppurple-600 text-white p-1 mt-10">Art Auction for Good</button>
          </div>
        </div>
      </div>
    </>
  );
};
