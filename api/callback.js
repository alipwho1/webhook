export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed"
        });
    }

    try {
        const data = req.body;

        console.log("=== FLOWQRIS CALLBACK ===");
        console.log(data);

        // Contoh validasi secret
        if (process.env.FLOWQRIS_SECRET) {
            if (data.secret !== process.env.FLOWQRIS_SECRET) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
        }

        // Contoh jika pembayaran sukses
        if (
            data.status === "PAID" ||
            data.status === "SUCCESS"
        ) {
            console.log("Pembayaran berhasil:", data.amount);

            // TODO:
            // Simpan ke database
            // Kirim ke bot Telegram
            // Tambah saldo user
        }

        return res.status(200).json({
            success: true
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
          }
