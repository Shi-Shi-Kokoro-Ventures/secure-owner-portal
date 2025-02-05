import { RouteObject } from "react-router-dom";
import Archives from "@/pages/Archives";
import Files from "@/pages/Files";
import Inspections from "@/pages/Inspections";
import Mailing from "@/pages/Mailing";
import Statements from "@/pages/Statements";
import OwnerSignatures from "@/pages/OwnerSignatures";
import OwnerArchives from "@/pages/OwnerArchives";
import PropertyArchives from "@/pages/PropertyArchives";
import TenantArchives from "@/pages/TenantArchives";
import TenantSignatures from "@/pages/TenantSignatures";

export const propertyManagerRoutes: RouteObject[] = [
  {
    path: "/archives",
    element: <Archives />,
  },
  {
    path: "/files",
    element: <Files />,
  },
  {
    path: "/inspections",
    element: <Inspections />,
  },
  {
    path: "/mailing",
    element: <Mailing />,
  },
  {
    path: "/statements",
    element: <Statements />,
  },
  {
    path: "/owner-signatures",
    element: <OwnerSignatures />,
  },
  {
    path: "/owner-archives",
    element: <OwnerArchives />,
  },
  {
    path: "/property-archives",
    element: <PropertyArchives />,
  },
  {
    path: "/tenant-archives",
    element: <TenantArchives />,
  },
  {
    path: "/tenant-signatures",
    element: <TenantSignatures />,
  },
];
