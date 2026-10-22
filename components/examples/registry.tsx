import type { ComponentType } from "react";
import { OddslyHeader } from "./OddslyHeader";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { TradingDashboard } from "./TradingDashboard";
import { AdminTable } from "./AdminTable";
import { SettingsPanel } from "./SettingsPanel";
import { AuthScreen } from "./AuthScreen";
import { PricingTable } from "./PricingTable";
import { CommandPaletteDemo } from "./CommandPalette";
import { MobileAppDemo } from "./MobileApp";
import { StatesGallery } from "./StatesGallery";

export type Demo = {
  slug: string;
  title: string;
  summary: string;
  kind: "Navegación" | "Dashboard" | "Formularios" | "Comercio" | "Estados" | "Móvil";
  tags: string[];
  teaches: string[];
  file: string;
  Component: ComponentType;
};

export const demos: Demo[] = [
  {
    slug: "oddsly",
    title: "Cabecera de apuestas en vivo",
    summary:
      "Barra superior de una casa de apuestas: marca, navegación, saldo, cinta en vivo y cuotas seleccionables.",
    kind: "Navegación",
    tags: ["nav", "datos en vivo", "selección"],
    teaches: [
      "Una cabecera puede cargar información densa sin verse sucia: dos filas, jerarquía clara.",
      "El estado seleccionado se marca con fondo y borde, no solo con color de texto.",
      "Las cifras van en monoespaciada con numeración tabular para que no bailen al actualizarse.",
    ],
    file: "components/examples/OddslyHeader.tsx",
    Component: OddslyHeader,
  },
  {
    slug: "analytics",
    title: "Dashboard de analítica",
    summary:
      "Panel SaaS con barra lateral, tres métricas, una serie temporal y una tabla de páginas con barras de proporción.",
    kind: "Dashboard",
    tags: ["métricas", "gráfico", "tabla"],
    teaches: [
      "Tres cifras bastan para un resumen; más se convierte en ruido.",
      "La variación se comunica con signo y color a la vez, nunca solo con color.",
      "La tabla usa barras de proporción en lugar de una segunda gráfica.",
    ],
    file: "components/examples/AnalyticsDashboard.tsx",
    Component: AnalyticsDashboard,
  },
  {
    slug: "trading",
    title: "Panel de trading",
    summary:
      "Vista de mercado con velas, libro de órdenes con profundidad y posiciones abiertas.",
    kind: "Dashboard",
    tags: ["mercados", "svg", "densidad"],
    teaches: [
      "Las velas son SVG puro: sin librería, sin canvas, y siguen siendo nítidas.",
      "La profundidad del libro se dibuja con un fondo proporcional, no con un gráfico aparte.",
      "Verde y rojo nunca son el único indicador: también hay signo y posición.",
    ],
    file: "components/examples/TradingDashboard.tsx",
    Component: TradingDashboard,
  },
  {
    slug: "admin",
    title: "Tabla de administración",
    summary:
      "Listado de usuarios con búsqueda, filtros, selección múltiple, estados y acciones en lote.",
    kind: "Dashboard",
    tags: ["tabla", "selección", "filtros"],
    teaches: [
      "La casilla de selección debe ser un botón real con aria-pressed, no un div.",
      "Los estados usan píldoras con texto, no solo color.",
      "La barra de acciones aparece con la selección y desaparece sin ella.",
    ],
    file: "components/examples/AdminTable.tsx",
    Component: AdminTable,
  },
  {
    slug: "settings",
    title: "Ajustes de cuenta",
    summary:
      "Pestañas, campos de formulario, interruptores accesibles y una zona de peligro separada.",
    kind: "Formularios",
    tags: ["formulario", "toggles", "permisos"],
    teaches: [
      "Cada interruptor es un button con role=switch y aria-checked, no un checkbox disfrazado.",
      "La zona de peligro va al final, con su propio color y una acción explícita.",
      "Los campos llevan etiqueta visible, no solo placeholder.",
    ],
    file: "components/examples/SettingsPanel.tsx",
    Component: SettingsPanel,
  },
  {
    slug: "auth",
    title: "Entrada y registro",
    summary:
      "Pantalla partida con proveedores externos, validación en vivo y un panel editorial a la derecha.",
    kind: "Formularios",
    tags: ["auth", "validación", "estados"],
    teaches: [
      "El error aparece junto al campo y se anuncia con role=alert.",
      "El botón se desactiva por validez, pero el mensaje explica el motivo.",
      "El panel derecho es lo que separa un formulario de una pantalla.",
    ],
    file: "components/examples/AuthScreen.tsx",
    Component: AuthScreen,
  },
  {
    slug: "pricing",
    title: "Precios con ciclo",
    summary:
      "Tres planes, alternancia mensual/anual y un plan destacado sin recurrir a degradados.",
    kind: "Comercio",
    tags: ["precios", "conversión", "comparación"],
    teaches: [
      "El plan recomendado se distingue por borde y peso, no por una etiqueta gigante.",
      "El descuento anual se muestra en el control, donde se decide.",
      "Cada plan lista lo que incluye, no lo que falta.",
    ],
    file: "components/examples/PricingTable.tsx",
    Component: PricingTable,
  },
  {
    slug: "palette",
    title: "Paleta de comandos",
    summary:
      "Buscador tipo ⌘K con grupos, resultado activo y atajos visibles a la derecha.",
    kind: "Navegación",
    tags: ["atajos", "búsqueda", "teclado"],
    teaches: [
      "Un atajo por resultado, alineado a la derecha, enseña el producto mientras se usa.",
      "El foco es visible y se mueve con flechas.",
      "Los grupos separan acciones de navegación; mezclarlos confunde.",
    ],
    file: "components/examples/CommandPalette.tsx",
    Component: CommandPaletteDemo,
  },
  {
    slug: "movil",
    title: "App móvil con barra y hoja",
    summary:
      "Pantalla de teléfono con barra inferior de cuatro destinos y una hoja de filtros.",
    kind: "Móvil",
    tags: ["mobile first", "navegación", "hoja"],
    teaches: [
      "Cuatro destinos es el máximo cómodo en una barra inferior.",
      "La hoja se apoya en el borde inferior y deja ver el contexto detrás.",
      "Las áreas táctiles pasan de 40 px aunque el texto sea pequeño.",
    ],
    file: "components/examples/MobileApp.tsx",
    Component: MobileAppDemo,
  },
  {
    slug: "estados",
    title: "Estados vacío, carga y error",
    summary:
      "Los tres estados que casi nadie diseña, con la misma tipografía y el mismo ritmo que el resto.",
    kind: "Estados",
    tags: ["vacío", "skeleton", "error"],
    teaches: [
      "Un estado vacío propone el siguiente paso; no se disculpa.",
      "El esqueleto de carga conserva la forma del contenido real.",
      "El error dice qué pasó y ofrece una acción para recuperarse.",
    ],
    file: "components/examples/StatesGallery.tsx",
    Component: StatesGallery,
  },
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
