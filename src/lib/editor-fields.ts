import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BookOpen,
  Briefcase,
  Code,
  Compass,
  Cpu,
  FileText,
  Fingerprint,
  FlaskConical,
  Globe2,
  Landmark,
  Lightbulb,
  Megaphone,
  Microscope,
  Mountain,
  Presentation,
  Scale,
  Stars,
} from "lucide-react";

export type EditorField = {
  icon: LucideIcon;
  name: string;
};

export const EDITOR_FIELDS: EditorField[] = [
  { icon: Stars, name: "Astrophysics" },
  { icon: FileText, name: "APA Reference Check" },
  { icon: FlaskConical, name: "Biology" },
  { icon: Microscope, name: "Chemistry" },
  { icon: Code, name: "Computing" },
  { icon: Presentation, name: "CV & Resume" },
  { icon: Briefcase, name: "Economics" },
  { icon: Cpu, name: "Electrical Engineering" },
  { icon: Scale, name: "Law" },
  { icon: Globe2, name: "Life Science" },
  { icon: Megaphone, name: "Marketing" },
  { icon: FileText, name: "MLA Reference Check" },
  { icon: Activity, name: "Pharmaceutical" },
  { icon: BookOpen, name: "Philosophy" },
  { icon: Landmark, name: "Political Science" },
  { icon: Fingerprint, name: "Psychology" },
  { icon: Mountain, name: "Theology" },
  { icon: Lightbulb, name: "Research Communication" },
  { icon: Compass, name: "Interdisciplinary Review" },
];
