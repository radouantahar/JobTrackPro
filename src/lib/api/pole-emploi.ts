import { JobListing } from "@/types/jobs";

const POLE_EMPLOI_CLIENT_ID = import.meta.env.VITE_POLE_EMPLOI_CLIENT_ID;
const POLE_EMPLOI_CLIENT_SECRET = import.meta.env
  .VITE_POLE_EMPLOI_CLIENT_SECRET;
const POLE_EMPLOI_API_URL =
  "https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search";

let accessToken: string | null = null;

async function getAccessToken() {
  if (accessToken) return accessToken;

  const response = await fetch(
    "https://entreprise.pole-emploi.fr/connexion/oauth2/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: POLE_EMPLOI_CLIENT_ID,
        client_secret: POLE_EMPLOI_CLIENT_SECRET,
        scope: "api_offresdemploiv2 o2dsoffre",
      }),
    },
  );

  const data = await response.json();
  accessToken = data.access_token;
  return accessToken;
}

export async function searchPoleEmploiJobs(params: {
  keywords?: string;
  location?: string;
  contractType?: string;
  minSalary?: number;
  maxSalary?: number;
  page?: number;
  limit?: number;
}) {
  try {
    const token = await getAccessToken();
    const queryParams = new URLSearchParams();

    if (params.keywords) queryParams.append("motsCles", params.keywords);
    if (params.location) queryParams.append("commune", params.location);
    if (params.contractType)
      queryParams.append("typeContrat", params.contractType);
    if (params.minSalary)
      queryParams.append("minSalaire", params.minSalary.toString());
    if (params.maxSalary)
      queryParams.append("maxSalaire", params.maxSalary.toString());

    queryParams.append(
      "range",
      `${(params.page || 0) * (params.limit || 10)}-${((params.page || 0) + 1) * (params.limit || 10) - 1}`,
    );

    const response = await fetch(
      `${POLE_EMPLOI_API_URL}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await response.json();
    return data.resultats.map(
      (job: any): JobListing => ({
        id: job.id,
        title: job.intitule,
        company: job.entreprise?.nom || "Entreprise confidentielle",
        location: `${job.lieuTravail.libelle}`,
        salary: job.salaire?.libelle || "À négocier",
        experience: job.experienceExige || "Non spécifié",
        industry: job.secteurActiviteLibelle || "Non spécifié",
        description: job.description,
        postedDate: job.dateCreation,
        requirements: [
          job.competences?.map((comp: any) => comp.libelle) || [],
          job.formations?.map((form: any) => form.libelle) || [],
        ]
          .flat()
          .slice(0, 5),
        benefits: [
          job.avantages || [],
          job.complementExercice ? [job.complementExercice] : [],
        ]
          .flat()
          .slice(0, 5),
      }),
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}
