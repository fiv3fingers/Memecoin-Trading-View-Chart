import app from './app';
import { connectToDatabase } from './utils/database';
import { laikaTokenAddy, PORT } from './config/config';
import { getNotification } from './utils/web3services';

const main = async () => {
    await connectToDatabase();
    // getNotification(laikaTokenAddy);
}

main()

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
