// pages/[id].js
export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await fetch(`https://api.example.com/data/${id}`);
    if (!res.ok) {
      // Not a 200 response
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (!data) {
      return {
        notFound: true,
      };
    }
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}

function MyComponent({ data, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>{data.name}</h1>
      {/* ... rest of your component ... */}
    </div>
  );
}
export default MyComponent;