import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../components/RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId("repositoryItem");
      const [firstRepoItem, secondRepoItem] = repositoryItems;

      const firstRepo = within(firstRepoItem);
      const secondRepo = within(secondRepoItem);

      const nodeOne = repositories.edges[0].node;
      const nodeTwo = repositories.edges[1].node;

      expect(firstRepo.getByText(nodeOne.fullName)).toBeDefined();
      expect(firstRepo.getByText(nodeOne.description)).toBeDefined();
      expect(firstRepo.getByText(nodeOne.language)).toBeDefined();
      expect(firstRepo.getByTestId("forksCount")).toHaveTextContent("1.6K");
      expect(firstRepo.getByTestId("stargazersCount")).toHaveTextContent(
        "21.9K",
      );
      expect(firstRepo.getByTestId("ratingAverage")).toHaveTextContent("88");
      expect(firstRepo.getByTestId("reviewCount")).toHaveTextContent("3");

      expect(secondRepo.getByText(nodeTwo.fullName)).toBeDefined();
      expect(secondRepo.getByText(nodeTwo.description)).toBeDefined();
      expect(secondRepo.getByText(nodeTwo.language)).toBeDefined();
      expect(secondRepo.getByTestId("forksCount")).toHaveTextContent("69");
      expect(secondRepo.getByTestId("stargazersCount")).toHaveTextContent(
        "1.8K",
      );
      expect(secondRepo.getByTestId("ratingAverage")).toHaveTextContent("72");
      expect(secondRepo.getByTestId("reviewCount")).toHaveTextContent("3");
    });
  });
});
