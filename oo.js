class RepositoryProvider
{
    providers;
    
    list(){
        for(const provider of this.providers)
        {
            let result=provider.list();
            resultat=resultat.concat(result);
        }
        return result;
    }
    search(text){}
}
