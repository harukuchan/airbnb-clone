import { format } from "date-fns";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InfoCard from "../components/InfoCard";

function Search({ searchResults }) {
  const router = useRouter();
  // console.log(searchResults);

  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div className="">
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guest`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stay for {noOfGuests} guest - {range} - in {location}
          </p>
          <h1 className="text-3xl font-semibold mb-6">Stay in {location}</h1>

          <div
            className="hidden lg:inline-flex mb-5 space-x-3 
          text-gray-800 whitespace-nowrap"
          >
            <p className="button">Huỷ dễ dàng</p>
            <p className="button">Type of Place</p>
            <p className="button">Huỷ dễ dàng</p>
            <p className="button">Type of Place</p>
            <p className="button">Huỷ dễ dàng</p>
            <p className="button">Type of Place</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
          
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz")
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return {
    props: {
      searchResults,
    },
  };
}
