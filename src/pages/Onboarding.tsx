import React from "react";
import {
  Route,
  Routes,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
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
  Th,
  Tbody,
  Td,
  FormControl,
  FormLabel,
  Modal,
  useModal,
  ModalContent,
  FormHelperText,
  Spinner,
  Select,
  Badge,
  SelectItem,
} from "../components";
import produce from "immer";
import { useContext } from "react";
import { Company, Grant, Shareholder, User } from "../types";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../App";

export const OnboardingContext = React.createContext<
  OnboardingFields & { dispatch: React.Dispatch<OnboardingAction> }
>({
  userName: "",
  email: "",
  companyName: "",
  shareholders: {},
  grants: {},
  dispatch: () => {},
});

// Progress indicator component
function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div>
      <div>
        <Text fontSize="sm" fontWeight="medium">
          Step {currentStep} of {totalSteps}
        </Text>
        <Text fontSize="sm" fontWeight="semibold">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </Text>
      </div>
      <div>
        <div 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export function UserStep() {
  const { userName, email, dispatch } = useContext(OnboardingContext);
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState<{ userName?: string; email?: string }>({});

  function validateForm() {
    const newErrors: { userName?: string; email?: string } = {};
    
    if (!userName.trim()) {
      newErrors.userName = "Name is required";
    } else if (userName.trim().length < 2) {
      newErrors.userName = "Name must be at least 2 characters";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validateForm()) {
      navigate("../company");
    }
  }

  const isFormValid = userName.trim().length >= 2 && email.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div>
      <Stack as="form" onSubmit={onSubmit} spacing="8">
        <div>
          <div>
            <span>🚀</span>
          </div>
          <Heading size="2xl">Let's get started</Heading>
          <Text>Create your equity management account</Text>
        </div>
        
        <ProgressIndicator currentStep={1} totalSteps={4} />
        
        <div>
          <FormControl id="userName" size="lg" isInvalid={!!errors.userName}>
                      <FormLabel>First, who is setting up this account?</FormLabel>
          <Input
            type="text"
            placeholder="Your Name"
            onChange={(e) => {
              dispatch({ type: "updateUser", payload: e.target.value });
              if (errors.userName) setErrors(prev => ({ ...prev, userName: undefined }));
            }}
            value={userName}
            size="lg"
          />
          {errors.userName && (
            <FormHelperText>
              {errors.userName}
            </FormHelperText>
          )}
        </FormControl>
        
        <div>
          <FormControl id="email" size="lg" isInvalid={!!errors.email}>
            <FormLabel>What email will you use to sign in?</FormLabel>
            <Input
              type="email"
              placeholder="Your Email"
              onChange={(e) => {
                dispatch({ type: "updateEmail", payload: e.target.value });
                if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
              }}
              value={email}
              size="lg"
            />
            <FormHelperText>
              {errors.email || "We only use this to create your account."}
            </FormHelperText>
          </FormControl>
        </div>
        
        <Button
          type="submit"
          disabled={!isFormValid}
          size="lg"
        >
            Next
          </Button>
        </div>
      </Stack>
    </div>
  );
}

export function CompanyStep() {
  const { companyName, dispatch } = useContext(OnboardingContext);
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (companyName.trim().length >= 2) {
      navigate("/start/shareholders");
    } else {
      setError("Company name must be at least 2 characters");
    }
  }

  const isFormValid = companyName.trim().length >= 2;

  return (
    <div>
      <Stack as="form" onSubmit={onSubmit} spacing="8">
        <div>
          <div>
            <span>🏢</span>
          </div>
          <Heading size="2xl">Company Information</Heading>
          <Text>Tell us about your company</Text>
        </div>
        
        <ProgressIndicator currentStep={2} totalSteps={4} />
        
        <div>
          <FormControl id="companyName" size="lg" isInvalid={!!error}>
            <FormLabel>What company are we examining?</FormLabel>
            <Input
              type="text"
              placeholder="Company Name"
              onChange={(e) => {
                dispatch({ type: "updateCompany", payload: e.target.value });
                if (error) setError("");
              }}
              value={companyName}
              size="lg"
            />
            {error && (
              <FormHelperText>
                {error}
              </FormHelperText>
            )}
          </FormControl>
          
          <Stack direction="row" spacing="4">
            <Button 
              variant="outline" 
              onClick={() => navigate("../user")}
              size="lg"
            >
              Back
            </Button>
            <Button 
              type="submit" 
              disabled={!isFormValid} 
              size="lg"
            >
              Next
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

export function ShareholdersStep() {
  const { isOpen, onOpen, onClose } = useModal();
  const { shareholders, companyName, dispatch } = useContext(OnboardingContext);
  const navigate = useNavigate();
  const [newShareholder, setNewShareholder] = React.useState<
    Omit<Shareholder, "id" | "grants">
  >({ name: "", group: "employee" });
  const [error, setError] = React.useState<string>("");

  function submitNewShareholder(e: React.FormEvent) {
    e.preventDefault();
    if (newShareholder.name.trim().length < 2) {
      setError("Shareholder name must be at least 2 characters");
      return;
    }
    dispatch({ type: "addShareholder", payload: newShareholder });
    setNewShareholder({ name: "", group: "employee" });
    setError("");
    onClose();
  }

  const hasShareholders = Object.keys(shareholders).length > 0;

  return (
    <div>
      <Stack spacing="8">
        <div>
          <div>
            <span>👥</span>
          </div>
          <Heading size="2xl">Shareholder Structure</Heading>
          <Text>Set up your shareholder structure</Text>
        </div>
        
        <ProgressIndicator currentStep={3} totalSteps={4} />
        
        <div>
          <Text fontSize="lg">
            Who are <strong>{companyName}</strong>'s shareholders?
          </Text>
          
          {hasShareholders ? (
            <Stack divider={<StackDivider />} spacing="4">
              {Object.values(shareholders).map((s, i) => (
                <Stack justify="between" direction="row" key={i}>
                  <Text fontSize="lg" fontWeight="semibold">{s.name}</Text>
                  <Badge>{s.group}</Badge>
                </Stack>
              ))}
            </Stack>
          ) : (
            <div>
              <Text fontSize="lg">No shareholders added yet</Text>
              <Text fontSize="sm">Click "Add Shareholder" to get started</Text>
            </div>
          )}
          
          <Modal isOpen={isOpen} onClose={onClose} title="Add New Shareholder">
            <ModalContent>
              <Stack as="form" onSubmit={submitNewShareholder} spacing="6">
                <FormControl isInvalid={!!error}>
                  <FormLabel>Shareholder Name</FormLabel>
                  <Input
                    value={newShareholder.name}
                    placeholder="Shareholder Name"
                    onChange={(e) => {
                      setNewShareholder((s) => ({ ...s, name: e.target.value }));
                      if (error) setError("");
                    }}
                    size="lg"
                  />
                  {error && (
                    <FormHelperText>
                      {error}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Type of Shareholder</FormLabel>
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
                </FormControl>
                <Button type="submit" size="lg">
                  Create
                </Button>
              </Stack>
            </ModalContent>
          </Modal>
          
          <Stack direction="row" spacing="4">
            <Button 
              variant="outline" 
              onClick={() => navigate("../company")}
              size="lg"
            >
              Back
            </Button>
            <Button 
              variant="outline" 
              onClick={onOpen} 
              size="lg"
            >
              Add Shareholder
            </Button>
            <Button 
              as={Link} 
              to="/start/grants" 
              size="lg"
              disabled={!hasShareholders}
            >
              Next
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

export function ShareholderGrantsStep() {
  const { shareholders, grants, dispatch } = useContext(OnboardingContext);
  const { shareholderID = '' } = useParams();
  const { isOpen, onOpen, onClose } = useModal();
  const navigate = useNavigate();
  const shareholder = shareholders[parseInt(shareholderID, 10)];

  const [draftGrant, setDraftGrant] = React.useState<Omit<Grant, "id">>({
    name: "",
    amount: 0,
    issued: "",
    type: "common",
  });

  if (!shareholder) {
    return <Navigate to="/start/shareholders" replace={true} />;
  }
  
  // Find the next shareholder in the list
  const shareholderIds = Object.keys(shareholders).map(id => parseInt(id, 10)).sort((a, b) => a - b);
  const currentIndex = shareholderIds.indexOf(shareholder.id);
  const nextShareholderId = shareholderIds[currentIndex + 1];
  
  const nextLink = nextShareholderId !== undefined
    ? `../../grants/${nextShareholderId}`
    : `../done`;

  function submitGrant(e: React.FormEvent) {
    e.preventDefault();
    if (!draftGrant.name.trim() || draftGrant.amount <= 0 || !draftGrant.issued) {
      return;
    }
    dispatch({
      type: "addGrant",
      payload: {
        shareholderID: parseInt(shareholderID, 10),
        grant: draftGrant,
      },
    });
    onClose();
    setDraftGrant({ name: "", amount: 0, issued: "", type: "common" });
  }

  const currentStep = 4;
  const totalSteps = 4;

  return (
    <div>
      <Stack spacing="8">
        <div>
          <div>
            <span>📊</span>
          </div>
          <Heading size="2xl">Equity Grants</Heading>
          <Text>Set up equity grants for shareholders</Text>
        </div>
        
        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        
        <div>
          <Text fontSize="lg">
            What grants does <strong>{shareholder.name}</strong> have?
          </Text>
          
          <div>
            <Table>
              <Thead>
                <Tr>
                  <Th>Occasion</Th>
                  <Th>Amount</Th>
                  <Th>Date</Th>
                  <Th>Type</Th>
                </Tr>
              </Thead>
              <Tbody>
                {shareholder.grants.map((gid) => (
                  <Tr key={gid}>
                    <Td>{grants[gid].name}</Td>
                    <Td>{grants[gid].amount}</Td>
                    <Td>{grants[gid].issued}</Td>
                    <Td>
                      <Badge>
                        {grants[gid].type}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
                {shareholder.grants.length === 0 && (
                  <Tr>
                    <Td colSpan={4}>
                      <Text>No grants to show for <strong>{shareholder.name}</strong></Text>
                      <Text fontSize="sm">Click "Add Grant" to get started</Text>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </div>
          
          <Modal isOpen={isOpen} onClose={onClose} title="Add New Grant">
            <ModalContent>
              <Stack as="form" onSubmit={submitGrant} spacing="6">
                <Text>
                  A <strong>Grant</strong> is any occasion where new shares are
                  issued to a shareholder.
                </Text>

                <FormControl>
                  <FormLabel>Grant Name</FormLabel>
                  <Input
                    placeholder="e.g., Initial Grant, Performance Bonus"
                    data-testid="grant-name"
                    value={draftGrant.name}
                    onChange={(e) =>
                      setDraftGrant((g) => ({ ...g, name: e.target.value }))
                    }
                    size="lg"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Number of Shares</FormLabel>
                  <Input
                    placeholder="0"
                    type="number"
                    data-testid="grant-amount"
                    value={draftGrant.amount || ""}
                    onChange={(e) =>
                      setDraftGrant((g) => ({
                        ...g,
                        amount: parseInt(e.target.value, 10) || 0,
                      }))
                    }
                    size="lg"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Grant Date</FormLabel>
                  <Input
                    type="date"
                    data-testid="grant-issued"
                    value={draftGrant.issued}
                    onChange={(e) =>
                      setDraftGrant((g) => ({ ...g, issued: e.target.value }))
                    }
                    size="lg"
                  />
                </FormControl>
                
                <FormControl>
                  <FormLabel>Grant Type</FormLabel>
                  <Select
                    placeholder="Select grant type"
                    value={draftGrant.type}
                    onValueChange={(value) =>
                      setDraftGrant((g) => ({ ...g, type: value as any }))
                    }
                  >
                    <SelectItem value="common">Common Stock</SelectItem>
                    <SelectItem value="preferred">Preferred Stock</SelectItem>
                    <SelectItem value="options">Stock Options</SelectItem>
                    <SelectItem value="warrants">Warrants</SelectItem>
                  </Select>
                </FormControl>
                
                <Button 
                  type="submit" 
                  size="lg"
                  disabled={!draftGrant.name.trim() || draftGrant.amount <= 0 || !draftGrant.issued}
                >
                  Save Grant
                </Button>
              </Stack>
            </ModalContent>
          </Modal>
          
          <Stack direction="row" spacing="4">
            <Button 
              variant="outline" 
              onClick={() => navigate("../shareholders")}
              size="lg"
            >
              Back
            </Button>
            <Button 
              variant="outline" 
              onClick={onOpen} 
              size="lg"
            >
              Add Grant
            </Button>
            <Button 
              as={Link} 
              to={nextLink} 
              size="lg"
            >
              {nextShareholderId !== undefined ? 'Next Shareholder' : 'Finish Setup'}
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
}

export function DoneStep() {
  const { authorize } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { email, userName, companyName, shareholders, grants } =
    useContext(OnboardingContext);

  const grantMutation = useMutation<Grant, unknown, Grant>((grant) =>
    fetch("/grant/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ grant }),
    }).then((res) => res.json())
  );
  const shareholderMutation = useMutation<Shareholder, unknown, Shareholder>(
    (shareholder) =>
      fetch("/shareholder/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shareholder),
      }).then((res) => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user");
      },
    }
  );
  const userMutation = useMutation<User, unknown, User>((user) =>
    fetch("/user/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }).then((res) => res.json())
  );
  const companyMutation = useMutation<Company, unknown, Company>((company) =>
    fetch("/company/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(company),
    }).then((res) => res.json())
  );

  React.useEffect(() => {
    async function saveData() {
      const user = await userMutation.mutateAsync({ email, name: userName });
      await Promise.all([
        ...Object.values(grants).map((grant) =>
          grantMutation.mutateAsync(grant)
        ),
        ...Object.values(shareholders).map((shareholder) =>
          shareholderMutation.mutateAsync(shareholder)
        ),
        companyMutation.mutateAsync({ name: companyName }),
      ]);

      if (user) {
        authorize(user);
        navigate("/dashboard");
      } else {
        // Something bad happened.
      }
    }

    saveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Stack alignItems="center" spacing="8">
        <div>
          <div>
            <span>🎉</span>
          </div>
          <Heading size="2xl">Almost Done!</Heading>
          <Text>Setting up your equity management account</Text>
        </div>
        
        <ProgressIndicator currentStep={4} totalSteps={4} />
        
        <div>
          <Spinner size="lg" />
          <Text fontSize="lg" fontWeight="semibold">
            Wrapping up...
          </Text>
          <Text fontSize="sm">
            Creating your account and setting up your equity structure
          </Text>
        </div>
      </Stack>
    </div>
  );
}
export interface OnboardingFields {
  companyName: string;
  userName: string;
  email: string;
  shareholders: { [shareholderID: number]: Shareholder };
  grants: { [grantID: number]: Grant };
}
interface UpdateUserAction {
  type: "updateUser";
  payload: string;
}
interface UpdateEmail {
  type: "updateEmail";
  payload: string;
}
interface UpdateCompanyAction {
  type: "updateCompany";
  payload: string;
}
interface AddShareholderAction {
  type: "addShareholder";
  payload: Omit<Shareholder, "id" | "grants">;
}
interface AddGrant {
  type: "addGrant";
  payload: { shareholderID: number; grant: Omit<Grant, "id"> };
}
type OnboardingAction =
  | UpdateUserAction
  | UpdateEmail
  | UpdateCompanyAction
  | AddShareholderAction
  | AddGrant;
export function signupReducer(
  state: OnboardingFields,
  action: OnboardingAction
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "updateUser":
        draft.userName = action.payload;
        if (draft.shareholders[0]) {
          draft.shareholders[0].name = action.payload;
        } else {
          draft.shareholders[0] = {
            id: 0,
            name: action.payload,
            grants: [],
            group: "founder",
          };
        }
        break;
      case "updateEmail":
        draft.email = action.payload;
        break;
      case "updateCompany":
        draft.companyName = action.payload;
        break;
      case "addShareholder":
        const nextShareholderID =
          Math.max(
            0,
            ...Object.keys(draft.shareholders).map((e) => parseInt(e, 10))
          ) + 1;
        draft.shareholders[nextShareholderID] = {
          id: nextShareholderID,
          grants: [],
          ...action.payload,
        };
        break;
      case "addGrant":
        const nextGrantID =
          Math.max(
            0,
            ...Object.keys(draft.grants).map((e) => parseInt(e, 10))
          ) + 1;
        draft.grants[nextGrantID] = {
          id: nextGrantID,
          ...action.payload.grant,
        };
        draft.shareholders[action.payload.shareholderID].grants.push(
          nextGrantID
        );
        break;
    }
  });
}
export function Start() {
  const [state, dispatch] = React.useReducer(signupReducer, {
    userName: "",
    email: "",
    companyName: "",
    shareholders: {},
    grants: {},
  });

  return (
    <OnboardingContext.Provider value={{ ...state, dispatch }}>
      <Routes>
        <Route path="/" element={<Navigate to="user" replace={true} />} />
        <Route path="user" element={<UserStep />} />
        <Route path="company" element={<CompanyStep />} />
        <Route path="shareholders" element={<ShareholdersStep />} />
        <Route
          path="grants"
          element={<Navigate to={`/start/grants/0`} replace={true} />}
        />
        <Route
          path="grants/:shareholderID"
          element={<ShareholderGrantsStep />}
        />
        <Route path="done" element={<DoneStep />} />
      </Routes>
    </OnboardingContext.Provider>
  );
}
