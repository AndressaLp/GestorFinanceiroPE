# Etapa 1 - Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar tudo
COPY . .

# Restaurar dependências
RUN dotnet restore ./GestorServicos.sln

# Build em modo Release
RUN dotnet build ./GestorServicos.sln -c Release --no-restore

# Publicar (gera arquivos otimizados)
RUN dotnet publish ./GestorServicos/GestorServicos.csproj -c Release -o /app/publish --no-restore

# Etapa 2 - Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copiar os arquivos publicados da etapa de build
COPY --from=build /app/publish .

# Expor a porta da aplicação (ajuste se necessário)
EXPOSE 8080

# Definir o comando de inicialização
ENTRYPOINT ["dotnet", "GestorServicos.dll"]
