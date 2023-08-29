import BitcoinImage from "../assets/crypto/bitcoin.png";
import EthereumImage from "../assets/crypto/etherium.png";
import DogecoinImage from "../assets/crypto/dogecoin.png";
import BinanceImage from "../assets/crypto/binance.png";

const items = [
  {
    image: BitcoinImage,
    title: "Bitcoin",
  },

  {
    image: EthereumImage,
    title: "Ethereum",
  },

  {
    image: DogecoinImage,
    title: "Dogecoin",
  },

  {
    image: BinanceImage,
    title: "Binance",
  },
];

function Dash() {
  return (
    <div className=" px-4  lg:pt-12">
      {/* Balances Cards  */}

      <div class="grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-4 gap-6 lg:gap-8">
        {items.map((v, i) => {
          return (
            <div
              key={i}
              className="bg-bg3 shadow-xl rounded-md p-6 pb-16 w-full flex flex-row justify-between items-center"
            >
              <div className="flex flex-col space-y-2">
                <span className="text-xl  text-text1"> {v.title} </span>

                <span className="text-3xl lg:text-4xl font-semibold">
                  {" "}
                  $1200.07{" "}
                </span>
              </div>

              <div className="self-start">
                <img src={v.image} alt="bitcoin" className="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dash;
