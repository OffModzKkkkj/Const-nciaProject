import sqlite3
import csv
import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, jsonify

app = Flask(__name__, template_folder=".", static_folder=".", static_url_path="")

DB_PATH = "leads.db"
CSV_PATH = "leads.csv"


def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            criado_em TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


def salvar_lead(nome, whatsapp):
    agora = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO leads (nome, whatsapp, criado_em) VALUES (?, ?, ?)",
              (nome, whatsapp, agora))
    conn.commit()
    conn.close()

    existe = os.path.isfile(CSV_PATH)
    with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        if not existe:
            writer.writerow(["nome", "whatsapp", "criado_em"])
        writer.writerow([nome, whatsapp, agora])


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/cadastrar", methods=["POST"])
def cadastrar():
    nome = request.form.get("nome", "").strip()
    whatsapp = request.form.get("whatsapp", "").strip()

    if not nome or not whatsapp:
        return redirect("/?erro=1")

    salvar_lead(nome, whatsapp)

    numero_destino = "557999638768"
    mensagem = f"Olá! Sou {nome} e tenho interesse no método Constância. Vi pelo site e quero saber mais!"
    from urllib.parse import quote
    url_wa = f"https://wa.me/{numero_destino}?text={quote(mensagem)}"
    return redirect(url_wa)


@app.route("/leads")
def listar_leads():
    senha = request.args.get("senha", "")
    if senha != os.environ.get("ADMIN_SENHA", "constancia2026"):
        return jsonify({"erro": "Acesso negado"}), 403

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, nome, whatsapp, criado_em FROM leads ORDER BY id DESC")
    rows = c.fetchall()
    conn.close()

    leads = [{"id": r[0], "nome": r[1], "whatsapp": r[2], "criado_em": r[3]} for r in rows]
    return jsonify({"total": len(leads), "leads": leads})


if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
