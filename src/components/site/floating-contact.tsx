import { Send, MessageCircle } from "lucide-react";
import { useSettings } from "@/lib/site-content";
import { track } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type ContactSettings = {
  telegram_enabled: boolean;
  telegram_username: string;
  telegram_default_message: string;
  telegram_position: string;
  telegram_button_label: string;
  whatsapp_enabled: boolean;
  whatsapp_number: string;
  whatsapp_default_message: string;
  whatsapp_position: string;
  whatsapp_button_label: string;
};

const FALLBACK: ContactSettings = {
  telegram_enabled: true,
  telegram_username: "Gs_sells",
  telegram_default_message: "",
  telegram_position: "bottom-left",
  telegram_button_label: "Talk on Telegram",
  whatsapp_enabled: true,
  whatsapp_number: "923037240099",
  whatsapp_default_message: "",
  whatsapp_position: "bottom-right",
  whatsapp_button_label: "Talk on WhatsApp",
};

function positionClass(position: string) {
  return position === "bottom-left" ? "left-4 sm:left-6" : "right-4 sm:right-6";
}

export function FloatingContactButtons() {
  const contact = useSettings<ContactSettings>("contact", FALLBACK);

  return (
    <>
      {contact.telegram_enabled && (
        <a
          href={`https://t.me/${contact.telegram_username}${
            contact.telegram_default_message
              ? `?text=${encodeURIComponent(contact.telegram_default_message)}`
              : ""
          }`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("TelegramClick", { source: "floating_telegram" })}
          aria-label={contact.telegram_button_label}
          className={cn(
            "fixed bottom-20 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 sm:bottom-6",
            positionClass(contact.telegram_position),
          )}
        >
          <Send className="h-5 w-5" />
        </a>
      )}

      {contact.whatsapp_enabled && (
        <a
          href={`https://wa.me/${contact.whatsapp_number}${
            contact.whatsapp_default_message
              ? `?text=${encodeURIComponent(contact.whatsapp_default_message)}`
              : ""
          }`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("WhatsAppClick", { source: "floating_whatsapp" })}
          aria-label={contact.whatsapp_button_label}
          className={cn(
            "fixed bottom-20 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 sm:bottom-6",
            positionClass(contact.whatsapp_position),
          )}
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      )}
    </>
  );
}
