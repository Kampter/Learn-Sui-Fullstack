import  { suiClient }  from  './suiClient';

export const suiService = {
    async getFormattedBalance (owner: string) {
        const balance = await suiClient.getBalance({
            owner: owner,
        });
        return Number(Number(balance.totalBalance) / 1000_000_000).toFixed(2);
    }
};