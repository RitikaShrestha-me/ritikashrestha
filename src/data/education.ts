import type { EducationRecord } from "@/models/types";

export const EDUCATION_RECORDS: EducationRecord[] = [
    { id: "tsp", short: "the M2 at Télécom SudParis", from: "2026", to: "present", degree: "M2 in Data Science and Network Intelligence",
      school: "Télécom SudParis – Institut Polytechnique de Paris, France", grade: "",
      blurb: "Internet of Things and Digital Twins course project, built in a team of three.", built: ["glof"] },
    { id: "ait", short: "the M.Eng at AIT", from: "2025", to: "present", degree: "M.Eng in IoT Systems Engineering (M1)",
      school: "Asian Institute of Technology, Thailand", grade: "First year: Grade A (3.94/4) · HM King's Scholarship recipient",
      blurb: "Two projects: a full-stack IoT platform built with a team, and a machine-learning paper written on my own.", built: ["ranger", "scheduler"] },
    { id: "vtu", short: "the B.E.", from: "2018", to: "2022", degree: "B.E. in Computer Science & Engineering",
      school: "Visvesvaraya Technological University (VTU), India", grade: "8.57/10 CGPA",
      blurb: "Studied at Nitte Meenakshi Institute of Technology. Alongside classes I built interface projects for college and on my own.", built: ["interfaces"] }
  ];
