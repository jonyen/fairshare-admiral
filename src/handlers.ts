import { http } from "msw";
import { Company, User, Shareholder, Grant } from "./types";

function nextID(collection: { [key: number]: unknown }) {
  return (
    Math.max(0, ...Object.keys(collection).map((e) => parseInt(e, 10))) + 1
  );
}

function storeState(state: any): void {
  localStorage.setItem("data", JSON.stringify(state));
}

export function getHandlers(
  params: {
    company?: Company;
    users?: { [email: string]: User };
    shareholders?: { [id: number]: Shareholder };
    grants?: { [id: number]: Grant };
  } = {},
  persist: boolean = false
) {
  let { company, users = {}, shareholders = {}, grants = {} } = params;
  
  if (persist) {
    storeState({
      shareholders,
      users,
      grants,
      company,
    });
    setInterval(() => {
      if (localStorage.getItem("data")) {
        storeState({
          shareholders,
          users,
          grants,
          company,
        });
      }
    }, 5000);
  }

  return [
    // Yes, this is a passwordless login
    http.post("/signin", async ({ request }) => {
      const body = await request.json() as { email: string };
      const user = Object.values(users).find((user) => user.email === body.email);
      if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(user), {
        headers: { 'Content-Type': 'application/json' }
      });
    }),

    http.post("/company/new", async ({ request }) => {
      company = await request.json() as Company;
      return new Response(JSON.stringify(company), {
        headers: { 'Content-Type': 'application/json' }
      });
    }),

    http.post(
      "/shareholder/new",
      async ({ request }) => {
        const body = await request.json() as { name: string; email?: string; grants?: number[]; group: "employee" | "founder" | "investor" };
        const { name, email, grants = [], group } = body;
        const shareholder: Shareholder = {
          name,
          email,
          grants,
          id: nextID(shareholders),
          group,
        };
        shareholders[shareholder.id] = shareholder;
        if (email) {
          const existingUser = users[email];
          if (existingUser.shareholderID) {
            // User already has a shareholder ID
            console.error("User already has a shareholder ID");
            return new Response(JSON.stringify({ error: "User already has a shareholder ID" }), { 
              status: 400,
              headers: { 'Content-Type': 'application/json' }
            });
          }
          users[email].shareholderID = shareholder.id;
        }
        return new Response(JSON.stringify(shareholder), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    ),

    http.post(
      "/grant/new",
      async ({ request }) => {
        const body = await request.json() as { shareholderID?: number; grant: Omit<Grant, "id"> };
        const {
          shareholderID,
          grant: { issued, name, amount, type },
        } = body;
        const grant: Grant = { name, issued, amount, id: nextID(grants), type };
        grants[grant.id] = grant;

        if (
          typeof shareholderID !== "undefined" &&
          shareholders[shareholderID]
        ) {
          shareholders[shareholderID].grants.push(grant.id);
        }

        return new Response(JSON.stringify(grant), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    ),

    http.post("/user/new", async ({ request }) => {
      const body = await request.json() as { email: string; name: string };
      const { email, name } = body;
      if (!!users[email]) {
        console.warn("User already exists");
        return new Response(JSON.stringify({ error: "User already exists" }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      users[email] = {
        email,
        name,
      };

      return new Response(JSON.stringify({ email, name }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }),

    http.get("/grants", () => {
      return new Response(JSON.stringify(grants), {
        headers: { 'Content-Type': 'application/json' }
      });
    }),

    http.get("/shareholders", () => {
      return new Response(JSON.stringify(shareholders), {
        headers: { 'Content-Type': 'application/json' }
      });
    }),

    http.get("/company", () => {
      return new Response(JSON.stringify(company), {
        headers: { 'Content-Type': 'application/json' }
      });
    }),

    http.post(
      "/shareholder/:shareholderID/edit",
      async ({ request }) => {
        const body = await request.json() as { id: number; name: string; group: "employee" | "founder" | "investor" };
        const { id, name, group } = body;
        if (shareholders[id]) {
          shareholders[id].group = group;
          shareholders[id].name = name;
        }
        return new Response(JSON.stringify(shareholders[id]), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    ),
  ];
}
