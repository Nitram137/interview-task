type SwapiPeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};
