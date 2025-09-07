export const Footer = () => {
  return (
    <footer className="border-green-400 border-t pt-6">
      <div className="grid gap-6 text-sm md:grid-cols-2">
        <div>
          <h4 className="mb-2 font-bold text-green-300">$ cat contact_info.json</h4>
          <div className="space-y-1 font-mono text-xs">
            <p>{'{'}</p>
            <p className="pl-4">"location": "Pula, Croatia",</p>
            <p className="pl-4">"email": "hello@techcitypula.org",</p>
            <p className="pl-4">"type": "non-profit"</p>
            <p>{'}'}</p>
          </div>
        </div>
        <div>
          <h4 className="mb-2 font-bold text-green-300">$ ls social_links/</h4>
          <div className="space-y-1 text-xs">
            <p>• github.com/techcitypula</p>
            <p>• twitter.com/techcitypula</p>
            <p>• linkedin.com/company/techcitypula</p>
            <p>• discord.gg/techcitypula</p>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-xs opacity-60">
        <p>$ echo "Made with ❤️ by the Tech City Pula community"</p>
      </div>
    </footer>
  );
};
