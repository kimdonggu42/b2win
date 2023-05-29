function NewsList({ newsData }: any) {
  return (
    <li>
      <div>{newsData.title}</div>
    </li>
  );
}

export default NewsList;
