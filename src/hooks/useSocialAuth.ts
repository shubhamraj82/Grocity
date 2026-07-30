import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react"
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const useSocialAuth=()=>{
    const [loadingStrategy, setLoadingStrategy]= useState<string | null>(null);
    const {startSSOFlow} = useSSO();
    const router = useRouter();

    const handleSocialAuth = async (strategy:"oauth_google"|"oauth_github"|"oauth_apple") =>{
        if(loadingStrategy) return

        setLoadingStrategy(strategy);

        try {
            const {createdSessionId, setActive} = await startSSOFlow({
                strategy,
                redirectUrl: AuthSession.makeRedirectUri({
                    scheme: "grocity",
                }),
            });

            if(!createdSessionId || !setActive) {
                Alert.alert("Sign-in incomplete","Sign-in did not complete.Please try again.");
                return;
            }

            await setActive({
                session: createdSessionId,
                navigate: () => {
                    router.replace("/(home)");
                },
            });
        } catch (error) {
            console.log("Error in scoial auth", error);
            Alert.alert("Error","Failed to sign in. Please try again");
        }finally{
            setLoadingStrategy(null);
        }
    }
    return { handleSocialAuth,loadingStrategy};

}

export default useSocialAuth;
