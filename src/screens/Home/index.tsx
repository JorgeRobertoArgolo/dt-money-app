import { useAuthContext } from "@/context/auth.context";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export const Home = () => {

    const { handleLogout } = useAuthContext();
    const { 
        fetchCategories, 
        fetchTransactions, 
        transactions, 
        refreshTransactions, 
        loading, 
        loadMoreTransactions
    } = useTransactionContext();
    const { handleError } = useErrorHandler();

    const handleFetchCategories = async () => {
        try {
            await fetchCategories();
        } catch (error) {
            handleError(error, "Falha ao buscar categorias.")
        }
    }

    const handleFetchInitialTransactions = async () => {
        try {
            await fetchTransactions({ page: 1 });
        } catch (error) {
            handleError(error, "Falha ao buscar transações")
        }
    }

    const handleLoadMoreTransactions = async () => {
        try {
            await loadMoreTransactions();
        } catch (error) {
            handleError(error, "Falha ao carregar novas transações")
        }
    }

    const handleRefreshTransactions = async () => {
        try {
            await refreshTransactions();
        } catch (error) {
            handleError(error, "Falha ao recarregar transações")
        }
    }

    useEffect(() => {
        (async () => {
            /**
             * Executa as requisições ao mesmo tempo
             */
            await Promise.all([handleFetchCategories(), handleFetchInitialTransactions()])
        })();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            
            <FlatList 
                ListHeaderComponent={ListHeader}
                data={transactions}
                keyExtractor={({id}) => `transaction-${id}`}
                renderItem={({item}) => <TransactionCard transaction={item} />}
                className="bg-background-secondary"
                onEndReached={handleLoadMoreTransactions}
                onEndReachedThreshold={0.5} //Faz com que ao chegar na metade, já carrege os próximos
                refreshControl={
                    <RefreshControl onRefresh={handleRefreshTransactions} refreshing={loading}/>
                }
            />
        </SafeAreaView>
    )
}