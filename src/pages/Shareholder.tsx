import React from "react";
import { useParams } from "react-router-dom";
import {
  Text,
  Heading,
  Stack,
  Button,
  Input,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  FormControl,
  Modal,
  useModal,
  ModalContent,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  TableCaption,
} from "../components";
import avatarSvg from "../assets/avatar-male.svg";
import { Grant, Shareholder } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import produce from "immer";

export function ShareholderPage() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useModal();
  const { shareholderID = ''} = useParams();
  const grantQuery = useQuery<{ [dataID: number]: Grant }>("grants", () =>
    fetch("/grants").then((e) => e.json())
  );
  const shareholderQuery = useQuery<{ [dataID: number]: Shareholder }>(
    "shareholders",
    () => fetch("/shareholders").then((e) => e.json())
  );

  const [draftGrant, setDraftGrant] = React.useState<Omit<Grant, "id">>({
    name: "",
    amount: 0,
    issued: "",
    type: "common",
  });
  const grantMutation = useMutation<Grant, unknown, Omit<Grant, "id">>(
    (grant) =>
      fetch("/grant/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shareholderID: parseInt(shareholderID, 10),
          grant,
        }),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        // this doesn't seem to triggering an instant re-render on consumers even though thats that it should ...
        /// https://github.com/tannerlinsley/react-query/issues/326
        queryClient.setQueryData<{ [id: number]: Shareholder } | undefined>(
          "shareholders",
          (s) => {
            if (s)
              return produce(s, (draft) => {
                draft[parseInt(shareholderID, 10)].grants.push(data.id);
              });
          }
        );
        queryClient.setQueriesData<{ [id: number]: Grant } | undefined>(
          "grants",
          (g) => {
            if (g) {
              return produce(g, (draft) => {
                draft[data.id] = data;
              });
            }
          }
        );
      },
    }
  );
  async function submitGrant(e: React.FormEvent) {
    e.preventDefault();
    try {
      await grantMutation.mutateAsync(draftGrant);
      onClose();
      setDraftGrant({ name: "", amount: 0, issued: "", type: "common" });
    } catch (e) {
      console.warn(e);
    }
  }

  if (
    grantQuery.status !== "success" ||
    shareholderQuery.status !== "success"
  ) {
    return <Spinner />;
  }
  if (!grantQuery.data || !shareholderQuery.data) {
    return (
      <Alert status="error">
        <AlertIcon status="error" />
        <AlertTitle>Error: {grantQuery.error}</AlertTitle>
      </Alert>
    );
  }

  const shareholder = shareholderQuery.data[parseInt(shareholderID)];

  return (
    <Stack>
      <Stack direction="row" justify="between" alignItems="baseline">
        <Heading
          size="4xl"
          bgGradient="linear(to-br, teal.400, teal.100)"
          bgClip="text"
        >
          Fair Share
        </Heading>
      </Stack>
      <Heading size="2xl">
        Shareholder
      </Heading>
      <Stack direction="row" spacing="8">
        <img src={avatarSvg} width="100px" height="auto" alt="Avatar" />
        <Stack>
          <Text fontSize="xl" fontWeight="bold">
            {shareholder.name}
          </Text>
          <Text fontSize="sm" fontWeight="thin">
            <strong data-testid="grants-issued">
              {shareholder.grants.length}
            </strong>{" "}
            grants issued
          </Text>
          <Text fontSize="sm" fontWeight="thin">
            <strong data-testid="shares-granted">
              {shareholder.grants.reduce(
                (acc, grantID) => acc + grantQuery.data[grantID].amount,
                0
              )}
            </strong>{" "}
            shares
          </Text>
        </Stack>
      </Stack>
      <Heading size="2xl">
        Grants
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Td>Occasion</Td>
            <Td>Date</Td>
            <Td>Amount</Td>
            <Td>Class</Td>
            <Td></Td>
          </Tr>
        </Thead>
        <Tbody>
          {shareholderQuery.data[parseInt(shareholderID, 10)].grants.map(
            (grantID) => {
              const { name, issued, amount, type } = grantQuery.data[grantID];
              return (
                <Tr key={grantID}>
                  <Td>{name}</Td>
                  <Td>{new Date(issued).toLocaleDateString()}</Td>
                  <Td>{amount}</Td>
                  <Td>{type}</Td>
                  <Td></Td>
                </Tr>
              );
            }
          )}
        </Tbody>
        <TableCaption>
          <Button colorScheme="teal" onClick={onOpen}>
            Add Grant
          </Button>
        </TableCaption>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <Stack as="form" onSubmit={submitGrant}>
            <Text>
              A <strong>Grant</strong> is any occasion where new shares are
              issued to a shareholder.
            </Text>

            <FormControl>
              <Input
                variant="flushed"
                placeholder="Name"
                data-testid="grant-name"
                value={draftGrant.name}
                onChange={(e) =>
                  setDraftGrant((g) => ({ ...g, name: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <Input
                variant="flushed"
                placeholder="Shares"
                data-testid="grant-amount"
                type="number"
                value={draftGrant.amount || ""}
                onChange={(e) =>
                  setDraftGrant((g) => ({
                    ...g,
                    amount: parseInt(e.target.value, 10),
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <Input
                variant="flushed"
                type="date"
                data-testid="grant-issued"
                value={draftGrant.issued}
                onChange={(e) =>
                  setDraftGrant((g) => ({ ...g, issued: e.target.value }))
                }
              />
            </FormControl>
            <Button type="submit">Save</Button>
          </Stack>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
