"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { type Language, useLanguage } from "@/components/LanguageProvider";
import {
  type MenuCategory,
  categoryOrder,
  getItemsByCategory,
  type MenuItem,
} from "@/data/menu";
import { getWhatsAppUrl, SITE } from "@/lib/constants";

type ProductKind = "food" | "drink";
type OrderType = "in_store" | "takeaway";
type PaymentMethod = "card" | "sinpe" | "cash";

type CartLine = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  note: string;
  kind: ProductKind;
};

const CART_STORAGE_KEY = "los-bravo-menu-cart";
const SINPE_MOBILE_NUMBER = "8363 9441";

function parsePrice(price: string): number {
  return Number(price.replace(/[^\d]/g, ""));
}

function formatCurrency(amount: number): string {
  return `₡${new Intl.NumberFormat("es-CR").format(amount)}`;
}

function getProductKind(item: MenuItem): ProductKind {
  return item.category === "bebidas" ? "drink" : "food";
}

function normalizeNote(note: string): string {
  return note.trim().replace(/\s+/g, " ");
}

function toOrderTypeLabel(type: OrderType | null, language: Language): string {
  if (!type) return language === "en" ? "Not selected" : "No seleccionado";
  if (language === "en") return type === "in_store" ? "At the restaurant" : "Takeaway";
  return type === "in_store" ? "En el local" : "Para llevar";
}

function toExpressLabel(value: boolean | null, language: Language): string {
  if (value === null) return language === "en" ? "Not selected" : "No seleccionado";
  if (language === "en") return value ? "Yes" : "No";
  return value ? "Sí" : "No";
}

function toPaymentLabel(method: PaymentMethod | null, language: Language): string {
  if (!method) return language === "en" ? "Not selected" : "No seleccionado";
  if (method === "card") return language === "en" ? "Card" : "Tarjeta";
  if (method === "sinpe") return language === "en" ? "SINPE Mobile" : "SINPE Móvil";
  return language === "en" ? "Cash" : "Efectivo";
}

function readInitialCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];
    const parsed = JSON.parse(savedCart) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function MenuPageClient() {
  const { language } = useLanguage();
  const [cart, setCart] = useState<CartLine[]>(() => readInitialCart());
  const [orderType, setOrderType] = useState<OrderType | null>(null);
  const [requiresExpress, setRequiresExpress] = useState<boolean | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [qtyByProduct, setQtyByProduct] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage errors.
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isCartOpen) return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen]);

  const subtotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [cart],
  );
  const packagingCost = useMemo(() => {
    if (orderType !== "takeaway") return 0;
    const foodCount = cart.reduce(
      (sum, line) => sum + (line.kind === "food" ? line.quantity : 0),
      0,
    );
    return foodCount * 300;
  }, [cart, orderType]);
  const total = subtotal + packagingCost;

  const hasItems = cart.length > 0;
  const categoryLabels: Record<MenuCategory, string> =
    language === "en"
      ? {
          hamburguesas: "Burgers",
          alitas: "Wings",
          combos: "Combos",
          bebidas: "Drinks",
        }
      : {
          hamburguesas: "Hamburguesas",
          alitas: "Alitas",
          combos: "Combos",
          bebidas: "Bebidas",
        };
  const copy = {
    es: {
      backHome: "Volver al inicio",
      heading: "MENÚ COMPLETO",
      intro: "Precios referenciales. Consultá disponibilidad y promos del día por WhatsApp.",
      quantity: "Cantidad",
      add: "Agregar",
      cart: "Carrito",
      closeCart: "Cerrar carrito",
      note: "Nota",
      remove: "Quitar",
      clearCart: "Vaciar carrito",
      subtotal: "Subtotal",
      package: "Empaque para llevar",
      total: "Total",
      orderType: "Tipo de pedido",
      inStore: "En el local",
      takeaway: "Para llevar",
      express: "¿Requiere express?",
      yes: "Sí",
      no: "No",
      expressMsg: "Debes enviar tu ubicación por medio de WhatsApp para calcular el precio del express.",
      paymentMethod: "Método de pago",
      card: "Tarjeta",
      sinpe: "SINPE Móvil",
      cash: "Efectivo",
      sinpeNumber: "Número SINPE Móvil",
      orderWhatsapp: "Realizar pedido por WhatsApp",
      openCart: "Abrir carrito",
      close: "Cerrar carrito",
      backToMain: "← Volver a la página principal",
      specialPrompt: "¿Deseas agregar indicaciones especiales?",
      specialTitle: "Indicaciones especiales",
      specialPlaceholder: "Ej: sin cebolla, extra queso...",
      save: "Guardar",
      cancel: "Cancelar",
      clearConfirmTitle: "¿Vaciar carrito?",
      clearConfirmText: "Se eliminarán todos los productos del pedido actual.",
      clearConfirmOk: "Sí, vaciar",
      clearConfirmCancel: "Cancelar",
    },
    en: {
      backHome: "Back to home",
      heading: "FULL MENU",
      intro: "Reference prices. Check availability and daily promos on WhatsApp.",
      quantity: "Quantity",
      add: "Add",
      cart: "Cart",
      closeCart: "Close cart",
      note: "Note",
      remove: "Remove",
      clearCart: "Clear cart",
      subtotal: "Subtotal",
      package: "Takeaway packaging",
      total: "Total",
      orderType: "Order type",
      inStore: "At the restaurant",
      takeaway: "Takeaway",
      express: "Do you need delivery?",
      yes: "Yes",
      no: "No",
      expressMsg: "Please send your location via WhatsApp so we can calculate the delivery fee.",
      paymentMethod: "Payment method",
      card: "Card",
      sinpe: "SINPE Mobile",
      cash: "Cash",
      sinpeNumber: "SINPE Mobile number",
      orderWhatsapp: "Place order via WhatsApp",
      openCart: "Open cart",
      close: "Close cart",
      backToMain: "← Back to main page",
      specialPrompt: "Do you want to add special instructions?",
      specialTitle: "Special instructions",
      specialPlaceholder: "Ex: no onion, extra cheese...",
      save: "Save",
      cancel: "Cancel",
      clearConfirmTitle: "Clear cart?",
      clearConfirmText: "All products from your current order will be removed.",
      clearConfirmOk: "Yes, clear",
      clearConfirmCancel: "Cancel",
    },
  }[language];
  const isSelectionComplete =
    hasItems &&
    orderType !== null &&
    paymentMethod !== null &&
    (orderType === "in_store" || requiresExpress !== null);

  const whatsappMessage = useMemo(() => {
    if (!hasItems) {
      return language === "en" ? "Hi, I want to place this order:" : "Hola, quiero realizar este pedido:";
    }

    const lines = cart
      .map((line) => {
        const row = [`- ${line.quantity}x ${line.name}`];
        if (line.note) row.push(`  Nota: ${line.note}`);
        return row.join("\n");
      })
      .join("\n");

    const sections: string[] = [
      language === "en" ? "Hi, I want to place this order:" : "Hola, quiero realizar este pedido:",
      "",
      language === "en" ? "Order:" : "Pedido:",
      lines,
      "",
      `${copy.subtotal}: ${formatCurrency(subtotal)}`,
    ];

    if (orderType === "takeaway") {
      sections.push(`${copy.package}: ${formatCurrency(packagingCost)}`);
    }

    sections.push(`${copy.total}: ${formatCurrency(total)}`);
    sections.push("");
    sections.push(language === "en" ? "Order details:" : "Detalles del pedido:");
    sections.push(`${copy.orderType}: ${toOrderTypeLabel(orderType, language)}`);
    sections.push(
      `${language === "en" ? "Delivery" : "Express"}: ${toExpressLabel(orderType === "takeaway" ? requiresExpress : false, language)}`,
    );
    sections.push(`${copy.paymentMethod}: ${toPaymentLabel(paymentMethod, language)}`);

    if (orderType === "takeaway" && requiresExpress === true) {
      sections.push("");
      sections.push(
        copy.expressMsg,
      );
    }

    if (paymentMethod === "sinpe") {
      sections.push("");
      sections.push(`${copy.sinpeNumber}: ${SINPE_MOBILE_NUMBER}`);
    }

    return sections.join("\n");
  }, [cart, copy, hasItems, language, orderType, packagingCost, paymentMethod, requiresExpress, subtotal, total]);

  const whatsappUrl = getWhatsAppUrl(whatsappMessage);
  const defaultWhatsappUrl = getWhatsAppUrl();

  function agregarAlCarrito(item: MenuItem, note: string) {
    const selectedQty = qtyByProduct[item.id] ?? 1;
    const normalizedNote = normalizeNote(note);
    const kind = getProductKind(item);
    const price = parsePrice(item.price);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (line) => line.id === item.id && normalizeNote(line.note) === normalizedNote,
      );

      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + selectedQty,
        };
        return next;
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price,
          quantity: selectedQty,
          note: normalizedNote,
          kind,
        },
      ];
    });

    setQtyByProduct((prev) => ({ ...prev, [item.id]: 1 }));
    setIsCartOpen(true);
  }

  async function handleAddProduct(item: MenuItem) {
    const wantsNoteResult = await Swal.fire({
      title: copy.specialPrompt,
      icon: "question",
      iconColor: "#e31837",
      background: "#0f1114",
      color: "#ffffff",
      confirmButtonText: copy.yes,
      confirmButtonColor: "#4b5563",
      showCancelButton: true,
      cancelButtonText: copy.no,
      cancelButtonColor: "#e31837",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl border border-white/10",
        confirmButton: "rounded-full",
        cancelButton: "rounded-full",
      },
    });

    if (wantsNoteResult.isDismissed || !wantsNoteResult.isConfirmed) {
      agregarAlCarrito(item, "");
      return;
    }

    const noteResult = await Swal.fire({
      title: copy.specialTitle,
      input: "text",
      inputPlaceholder: copy.specialPlaceholder,
      background: "#0f1114",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonText: copy.save,
      confirmButtonColor: "#4b5563",
      cancelButtonText: copy.cancel,
      cancelButtonColor: "#e31837",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl border border-white/10",
        confirmButton: "rounded-full",
        cancelButton: "rounded-full",
        input: "rounded-lg border border-white/20 bg-black/30 text-white",
      },
    });

    if (noteResult.isDismissed) return;

    agregarAlCarrito(item, noteResult.value ?? "");
  }

  function updateLineQuantity(index: number, quantity: number) {
    setCart((prev) => {
      const next = [...prev];
      if (!next[index]) return prev;
      if (quantity <= 0) {
        next.splice(index, 1);
        return next;
      }
      next[index] = { ...next[index], quantity };
      return next;
    });
  }

  function removeLine(index: number) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  async function clearCart() {
    const confirmResult = await Swal.fire({
      title: copy.clearConfirmTitle,
      text: copy.clearConfirmText,
      icon: "warning",
      iconColor: "#e31837",
      background: "#0f1114",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonText: copy.clearConfirmOk,
      confirmButtonColor: "#e31837",
      cancelButtonText: copy.clearConfirmCancel,
      cancelButtonColor: "#4b5563",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl border border-white/10",
        confirmButton: "rounded-full",
        cancelButton: "rounded-full",
      },
    });

    if (!confirmResult.isConfirmed) return;

    setCart([]);
    setOrderType(null);
    setRequiresExpress(null);
    setPaymentMethod(null);
    setIsCartOpen(false);
  }

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10 py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=1600&q=75"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-bravo-black/88" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-bravo-muted transition hover:text-bravo-red"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {copy.backHome}
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-bravo-red">
            {SITE.name}
          </p>
          <h1 className="mt-2 font-display text-5xl tracking-wide text-white md:text-6xl">
            {copy.heading}
          </h1>
          <p className="mt-4 max-w-xl text-bravo-muted">
            {copy.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <section>
          <nav
            className="sticky top-[var(--header-offset)] z-40 -mx-4 mb-8 flex flex-wrap gap-2 border-b border-white/10 bg-bravo-black/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 md:gap-3 md:py-3.5"
            aria-label="Categorías del menú"
          >
            {categoryOrder.map((cat) => (
              <a
                key={cat}
                href={`#${cat}`}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-bravo-red hover:bg-bravo-red/10"
              >
                {categoryLabels[cat]}
              </a>
            ))}
          </nav>

          <div className="space-y-16 md:space-y-20">
            {categoryOrder.map((cat) => {
              const items = getItemsByCategory(cat);
              return (
                <section
                  key={cat}
                  id={cat}
                  className="scroll-mt-[calc(var(--header-offset)+6rem)]"
                >
                  <h2 className="font-display text-3xl tracking-wide text-white md:text-4xl">
                    {categoryLabels[cat].toUpperCase()}
                  </h2>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                      <article
                        key={item.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-bravo-black-soft transition hover:border-bravo-red/40 hover:shadow-[0_0_40px_rgba(227,24,55,0.12)]"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-bravo-black/80 via-transparent to-transparent" />
                        </div>

                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3 className="font-display text-2xl tracking-wide text-white md:text-[1.65rem]">
                              {item.name}
                            </h3>
                            <span className="shrink-0 rounded-md bg-bravo-red/20 px-2.5 py-1 text-sm font-semibold text-bravo-red">
                              {item.price}
                            </span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-bravo-muted">{item.description}</p>

                          <div className="mt-4 border-t border-white/10 pt-3">
                            <p className="text-[11px] font-semibold uppercase tracking-widest text-bravo-muted">
                              {copy.quantity}
                            </p>
                            <div className="mt-2 flex items-center justify-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setQtyByProduct((prev) => ({
                                    ...prev,
                                    [item.id]: Math.max(1, (prev[item.id] ?? 1) - 1),
                                  }))
                                }
                                className="h-8 w-8 rounded-full border border-white/20 text-sm text-white transition hover:border-bravo-red"
                                aria-label={`Disminuir cantidad de ${item.name}`}
                              >
                                -
                              </button>
                              <span className="min-w-7 text-center text-base font-semibold text-white">
                                {qtyByProduct[item.id] ?? 1}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setQtyByProduct((prev) => ({
                                    ...prev,
                                    [item.id]: (prev[item.id] ?? 1) + 1,
                                  }))
                                }
                                className="h-8 w-8 rounded-full border border-white/20 text-sm text-white transition hover:border-bravo-red"
                                aria-label={`Aumentar cantidad de ${item.name}`}
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                void handleAddProduct(item);
                              }}
                              className="mt-3 w-full rounded-full bg-bravo-red px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                            >
                              {copy.add}
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>

      <div className="mx-auto mt-6 flex max-w-6xl justify-center border-t border-white/10 px-4 pb-14 pt-10 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold text-bravo-red underline-offset-4 transition hover:underline"
        >
          {copy.backToMain}
        </Link>
      </div>

      {hasItems ? (
        <div
          className={`fixed inset-0 z-50 flex h-dvh w-screen flex-col overflow-hidden bg-bravo-black-soft transition duration-300 md:inset-auto md:top-8 md:right-8 md:bottom-8 md:h-auto md:w-[min(92vw,400px)] md:rounded-2xl md:border md:border-white/10 md:shadow-2xl ${
            isCartOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-6 opacity-0 md:translate-y-6"
          }`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 md:px-5">
            <h2 className="font-display text-2xl tracking-wide text-white">{copy.cart}</h2>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="h-8 w-8 rounded-full border border-white/20 text-white transition hover:border-bravo-red"
                aria-label={copy.closeCart}
              >
                ×
              </button>
            </div>
          </div>

          <div className="custom-cart-scroll min-h-0 flex-1 overflow-y-auto px-4 py-4 md:px-5">
            <div className="space-y-3">
              {cart.map((line, index) => (
                <div key={`${line.id}-${line.note || "sin-nota"}-${index}`} className="rounded-xl border border-white/10 p-3">
                  <p className="text-sm font-semibold text-white">
                    {line.quantity}x {line.name}
                  </p>
                  {line.note ? <p className="mt-1 text-xs text-bravo-muted">{copy.note}: {line.note}</p> : null}
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-bravo-red">{formatCurrency(line.price * line.quantity)}</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateLineQuantity(index, line.quantity - 1)}
                        className="h-7 w-7 rounded-full border border-white/20 text-sm text-white transition hover:border-bravo-red"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm text-white">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateLineQuantity(index, line.quantity + 1)}
                        className="h-7 w-7 rounded-full border border-white/20 text-sm text-white transition hover:border-bravo-red"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeLine(index)}
                        className="ml-2 text-xs font-semibold uppercase tracking-widest text-bravo-muted transition hover:text-bravo-red"
                      >
                        {copy.remove}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  void clearCart();
                }}
                className="text-xs font-semibold uppercase tracking-widest text-bravo-muted transition hover:text-bravo-red"
              >
                {copy.clearCart}
              </button>
            </div>

            <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm">
              <div className="flex items-center justify-between text-bravo-muted">
                <span>{copy.subtotal}</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {orderType === "takeaway" ? (
                <div className="flex items-center justify-between text-bravo-muted">
                  <span>{copy.package}</span>
                  <span>{formatCurrency(packagingCost)}</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between font-semibold text-white">
                <span>{copy.total}</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-bravo-muted">
                  {copy.orderType}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("in_store");
                      setRequiresExpress(null);
                    }}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      orderType === "in_store"
                        ? "border-bravo-red bg-bravo-red/15 text-white"
                        : "border-white/15 text-bravo-muted hover:border-bravo-red"
                    }`}
                  >
                    {copy.inStore}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType("takeaway");
                      setRequiresExpress(null);
                    }}
                    className={`rounded-lg border px-3 py-2 text-sm transition ${
                      orderType === "takeaway"
                        ? "border-bravo-red bg-bravo-red/15 text-white"
                        : "border-white/15 text-bravo-muted hover:border-bravo-red"
                    }`}
                  >
                    {copy.takeaway}
                  </button>
                </div>
              </div>

              {orderType === "takeaway" ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-bravo-muted">
                    {copy.express}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRequiresExpress(true)}
                      className={`rounded-lg border px-3 py-2 text-sm transition ${
                      requiresExpress === true
                          ? "border-bravo-red bg-bravo-red/15 text-white"
                          : "border-white/15 text-bravo-muted hover:border-bravo-red"
                      }`}
                    >
                      {copy.yes}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRequiresExpress(false)}
                      className={`rounded-lg border px-3 py-2 text-sm transition ${
                      requiresExpress === false
                          ? "border-bravo-red bg-bravo-red/15 text-white"
                          : "border-white/15 text-bravo-muted hover:border-bravo-red"
                      }`}
                    >
                      {copy.no}
                    </button>
                  </div>
                  {requiresExpress === true ? (
                    <p className="mt-2 text-xs text-bravo-muted">
                      {copy.expressMsg}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-bravo-muted">
                  {copy.paymentMethod}
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(
                    [
                      ["card", copy.card],
                      ["sinpe", copy.sinpe],
                      ["cash", copy.cash],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPaymentMethod(value)}
                      className={`rounded-lg border px-2 py-2 text-xs transition ${
                        paymentMethod === value
                          ? "border-bravo-red bg-bravo-red/15 text-white"
                          : "border-white/15 text-bravo-muted hover:border-bravo-red"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {paymentMethod === "sinpe" ? (
                  <p className="mt-2 text-xs text-bravo-muted">
                    {copy.sinpeNumber}:{" "}
                    <span className="font-semibold text-white">{SINPE_MOBILE_NUMBER}</span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-4 md:px-5">
            <a
              href={isSelectionComplete ? whatsappUrl : undefined}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!isSelectionComplete}
              className={`inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${
                isSelectionComplete
                  ? "bg-bravo-red text-white hover:brightness-110"
                  : "cursor-not-allowed bg-white/10 text-bravo-muted"
              }`}
            >
              {copy.orderWhatsapp}
            </a>
          </div>
        </div>
      ) : null}

      {hasItems ? (
        !isCartOpen ? (
          <button
            type="button"
            onClick={() => setIsCartOpen((prev) => !prev)}
            className="fixed right-4 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-bravo-red text-white shadow-lg transition hover:scale-105 hover:shadow-xl md:right-8 md:bottom-8 md:h-16 md:w-16"
            aria-label={isCartOpen ? copy.close : copy.openCart}
          >
            <svg className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H7.2" />
              <circle cx="10" cy="20" r="1.7" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.7" fill="currentColor" stroke="none" />
            </svg>
            <span className="absolute -top-1 -right-1 min-w-5 rounded-full bg-white px-1 text-center text-[10px] font-bold text-bravo-red">
              {cart.reduce((sum, line) => sum + line.quantity, 0)}
            </span>
          </button>
        ) : null
      ) : (
        <a
          href={defaultWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-4 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl md:right-8 md:bottom-8 md:h-16 md:w-16"
          aria-label="Abrir WhatsApp"
        >
          <svg className="h-8 w-8 md:h-9 md:w-9" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      )}

      <style jsx global>{`
        .custom-cart-scroll {
          scrollbar-width: thin;
          scrollbar-color: #3f454d #12161b;
        }

        .custom-cart-scroll::-webkit-scrollbar {
          width: 9px;
        }

        .custom-cart-scroll::-webkit-scrollbar-track {
          background: #12161b;
          border-radius: 9999px;
        }

        .custom-cart-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #4b5563, #2f3740);
          border-radius: 9999px;
          border: 1px solid #1c222a;
        }

        .custom-cart-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e31837, #b90f2a);
        }

        .swal2-popup .swal2-input {
          border: 1px solid #e5e7eb !important;
          box-shadow: none !important;
        }

        .swal2-popup .swal2-input:focus {
          border-color: #e31837 !important;
          box-shadow: 0 0 0 1px #e31837 !important;
        }
      `}</style>
    </main>
  );
}
