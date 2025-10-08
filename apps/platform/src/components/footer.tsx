export const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <h4>$ cat contact_info.json</h4>
          <div>
            <p>{'{'}</p>
            <p>"location": "Pula, Croatia",</p>
            <p>"email": "hello@techcitypula.org",</p>
            <p>"type": "non-profit"</p>
            <p>{'}'}</p>
          </div>
        </div>
        <div>
          <h4>$ ls social_links/</h4>
          <div>
            <p>• github.com/techcitypula</p>
            <p>• twitter.com/techcitypula</p>
            <p>• linkedin.com/company/techcitypula</p>
            <p>• discord.gg/techcitypula</p>
          </div>
        </div>
      </div>
      <div>
        <p>$ echo "Made with ❤️ by the Tech City Pula community"</p>
      </div>
    </footer>
  );
};
