import React from "react";
import { VictoryPie } from "victory";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Text,
  Heading,
  Stack,
  Button,
  Input,
  StackDivider,
  Table,
  Thead,
  Tr,
  Tbody,
  Td,
  Th,
  Modal,
  useModal,
  ModalContent,
  Spinner,
  Alert,
  AlertTitle,
  AlertIcon,
  Select,
  SelectItem,
} from "../components";
import { Grant, Shareholder } from "../types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import produce from "immer";
import { AuthContext } from "../App";

export function Dashboard() {
  const { isOpen, onOpen, onClose } = useModal();
  const queryClient = useQueryClient();
  const { deauthorize } = React.useContext(AuthContext);
  const [newShareholder, setNewShareholder] = React.useState<
    Omit<Shareholder, "id" | "grants">
  >({ name: "", group: "employee" });
  const { mode } = useParams();

  const shareholderMutation = useMutation<
    Shareholder,
    unknown,
    Omit<Shareholder, "id" | "grants">
  >(
    (shareholder) =>
      fetch("/shareholder/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shareholder),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<{ [id: number]: Shareholder } | undefined>(
          "shareholders",
          (s) => {
            if (s) {
              return produce(s, (draft) => {
                draft[data.id] = data;
              });
            }
          }
        );
      },
    }
  );

  // Fetch raw data as dictionaries (normalized from API)
  const grant = useQuery<{ [dataID: number]: Grant }, string>("grants", () =>
    fetch("/grants").then((e) => e.json())
  );
  const shareholder = useQuery<{ [dataID: number]: Shareholder }>(
    "shareholders",
    () => fetch("/shareholders").then((e) => e.json())
  );

  // Create derived data structures for easier consumption
  const grants = React.useMemo(() => grant.data || {}, [grant.data]);
  const shareholders = React.useMemo(() => Object.values(shareholder.data || {}), [shareholder.data]);

  // Enhanced shareholders with computed grant totals
  const shareholdersWithTotals = React.useMemo(() =>
    shareholders.map(s => ({
      ...s,
      totalShares: s.grants.reduce((acc, grantID) => acc + (grants[grantID]?.amount || 0), 0),
      grantDetails: s.grants.map(grantID => grants[grantID]).filter(Boolean)
    })),
    [shareholders, grants]
  );

  if (grant.status === "error") {
    return (
      <Alert status="error">
        <AlertIcon status="error" />
        <AlertTitle>Error: {grant.error}</AlertTitle>
      </Alert>
    );
  }
  if (grant.status !== "success") {
    return <Spinner />;
  }
  if (!grant.data || !shareholder.data) {
    return (
      <Alert status="error">
        <AlertIcon status="error" />
        <AlertTitle>Failed to get any data</AlertTitle>
      </Alert>
    );
  }

  // Chart data functions using cleaner data structures
  const getGroupData = () => {
    if (shareholdersWithTotals.length === 0) return [];

    return ["investor", "founder", "employee"]
      .map((group) => ({
        x: group,
        y: shareholdersWithTotals
          .filter((s) => s.group === group)
          .reduce((acc, s) => acc + s.totalShares, 0),
      }))
      .filter((entry) => entry.y > 0);
  };

  const getInvestorData = () => {
    if (shareholdersWithTotals.length === 0) return [];

    return shareholdersWithTotals
      .map((s) => ({
        x: s.name,
        y: s.totalShares,
      }))
      .filter((e) => e.y > 0);
  };

  async function submitNewShareholder(e: React.FormEvent) {
    e.preventDefault();
    await shareholderMutation.mutateAsync(newShareholder);
    onClose();
  }

  function handleLogout() {
    localStorage.removeItem("session");
    deauthorize();
  }

  return (
    <Stack spacing="8" className="px-4">
      <Stack direction="row" justify="between" alignItems="baseline">
        <Heading size="4xl">
          Fair Share
        </Heading>
        <Stack direction="row" spacing="2" alignItems="center">
          <Button
            as={Link}
            to="/dashboard/investor"
            variant="ghost"
          >
            By Investor
          </Button>
          <Button
            as={Link}
            to="/dashboard/group"
            variant="ghost"
          >
            By Group
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="md"
            className="ml-4"
          >
            Log Out
          </Button>
        </Stack>
      </Stack>

      <div className="flex justify-center">
        <VictoryPie
          data={mode === "investor" ? getInvestorData() : getGroupData()}
          width={400}
          height={400}
        />
      </div>

      <Stack divider={<StackDivider />} spacing="6">
        <Heading>Shareholders</Heading>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Group</Th>
              <Th>Grants</Th>
              <Th>Shares</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shareholdersWithTotals.map((s) => (
              <Tr key={s.id}>
                <Td>
                  <Link to={`/shareholder/${s.id}`}>
                    <Stack direction="row" alignItems="center">
                      <Text>{s.name}</Text>
                      <ArrowRight />
                    </Stack>
                  </Link>
                </Td>
                <Td data-testid={`shareholder-${s.name}-group`}>{s.group}</Td>
                <Td data-testid={`shareholder-${s.name}-grants`}>
                  {s.grants.length}
                </Td>
                <Td data-testid={`shareholder-${s.name}-shares`}>
                  {s.totalShares.toLocaleString()}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button onClick={onOpen}>Add Shareholder</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            <Stack as="form" onSubmit={submitNewShareholder}>
              <Input
                value={newShareholder.name}
                placeholder="Shareholder Name"
                onChange={(e) =>
                  setNewShareholder((s) => ({ ...s, name: e.target.value }))
                }
              />
              <Select
                placeholder="Type of shareholder"
                value={newShareholder.group}
                onValueChange={(value) =>
                  setNewShareholder((s) => ({
                    ...s,
                    group: value as any,
                  }))
                }
              >
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="founder">Founder</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </Select>
              <Button type="submit">
                Save
              </Button>
            </Stack>
          </ModalContent>
        </Modal>
      </Stack>
    </Stack>
  );
}
