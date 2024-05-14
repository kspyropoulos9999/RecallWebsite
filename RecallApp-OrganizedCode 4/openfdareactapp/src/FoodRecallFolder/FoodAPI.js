const fetchFoodRecalls = async () => {
  try {
    const response = await fetch(
      "https://api.fda.gov/food/enforcement.json?limit=1000"
    );
    const data = await response.json();
    // Check if the response contains results
    if (!data.results) {
      throw new Error("No recall data found.");
    }
    // Sort recalls based on the recall_initiation_date in descending order
    const sortedRecalls = data.results.sort((a, b) => {
      const dateA = parseInt(a.recall_initiation_date, 10);
      const dateB = parseInt(b.recall_initiation_date, 10);
      return dateB - dateA;
    });
    return sortedRecalls;
  } catch (error) {
    throw new Error("An error occurred while fetching recall data.");
  }
};

export default fetchFoodRecalls;
