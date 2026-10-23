const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),cp=require('node:child_process');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'icpc-check-'));
const snippets=cp.execFileSync(process.execPath,[path.join(__dirname,'check-icpc.cjs'),'--emit-cpp'],{encoding:'utf8'});
const checks=String.raw`
int main(){
 mt19937 rng(9512);
 for(int trial=0;trial<300;++trial){
  int n=1+rng()%25; vector<ll>a(n);for(ll&x:a)x=int(rng()%41)-20;
  auto original=a; auto s=prefixSum(a);Fenwick bit(n);SegSum seg(a);
  for(int i=0;i<n;++i)bit.add(i+1,a[i]);
  for(int it=0;it<50;++it){
   int p=rng()%n;ll value=int(rng()%41)-20;bit.add(p+1,value-a[p]);a[p]=value;seg.setPoint(p,value);
   int l=rng()%n,r=rng()%n;if(l>r)swap(l,r);ll brute=accumulate(a.begin()+l,a.begin()+r+1,0LL);
   assert(bit.range(l+1,r+1)==brute);assert(seg.query(l,r+1)==brute);
  }
  vector<int>v(n);for(int&x:v)x=rng()%10;vector<int>dp(n,1);int best=0;
  for(int i=0;i<n;++i){for(int j=0;j<i;++j)if(v[j]<v[i])dp[i]=max(dp[i],dp[j]+1);best=max(best,dp[i]);}
  assert(lisLength(v)==best);
  int m=1+rng()%7,W=rng()%20;vector<int>w(m);vector<ll>val(m);for(int i=0;i<m;++i){w[i]=1+rng()%7;val[i]=int(rng()%20)-3;}
  ll brute01=0;for(int mask=0;mask<(1<<m);++mask){int wt=0;ll gain=0;for(int i=0;i<m;++i)if(mask>>i&1){wt+=w[i];gain+=val[i];}if(wt<=W)brute01=max(brute01,gain);}
  assert(knapsack01(w,val,W)==brute01);
  vector<ll>br(W+1);for(int cap=1;cap<=W;++cap){br[cap]=br[cap-1];for(int i=0;i<m;++i)if(w[i]<=cap)br[cap]=max(br[cap],br[cap-w[i]]+val[i]);}
  assert(knapsackComplete(w,val,W)==br[W]);
  string text,pat;for(int i=0;i<n;++i)text+=char('a'+rng()%3);for(int i=0;i<int(rng()%8);++i)pat+=char('a'+rng()%3);int matches=0;
  if(!pat.empty())for(int i=0;i+pat.size()<=text.size();++i)matches+=text.substr(i,pat.size())==pat;
  assert(countMatches(text,pat)==matches);
  for(int i=0;i<=n;++i)for(int j=i;j<n;++j)assert(s[j+1]-s[i]==accumulate(original.begin()+i,original.begin()+j+1,0LL));
  vector<vector<pair<int,ll>>>g(n);vector<vector<int>>un(n);vector<vector<ll>>d(n,vector<ll>(n,DIJK_INF));
  for(int i=0;i<n;++i){d[i][i]=0;for(int j=0;j<n;++j)if(rng()%8==0){ll wt=rng()%10;g[i].push_back({j,wt});un[i].push_back(j);d[i][j]=min(d[i][j],wt);}}
  for(int k=0;k<n;++k)for(int i=0;i<n;++i)for(int j=0;j<n;++j)d[i][j]=min(d[i][j],d[i][k]+d[k][j]);
  for(int src=0;src<n;++src){assert(dijkstra(g,src)==d[src]);auto bd=bfs(un,src);vector<int>exp(n,-1);exp[src]=0;for(int it=0;it<n;++it)for(int u=0;u<n;++u)if(exp[u]>=0)for(int v:un[u])if(exp[v]<0||exp[v]>exp[u]+1)exp[v]=exp[u]+1;assert(bd==exp);}
  DSU uf(n);vector<int>group(n);iota(group.begin(),group.end(),0);
  for(int it=0;it<50;++it){int u=rng()%n,v=rng()%n;bool diff=group[u]!=group[v];assert(uf.unite(u,v)==diff);int old=group[v],next=group[u];for(int&x:group)if(x==old)x=next;for(int i=0;i<n;++i)for(int j=0;j<n;++j)assert((uf.find(i)==uf.find(j))==(group[i]==group[j]));}
  vector<vector<int>>dag(n);for(int u=0;u<n;++u)for(int v=u+1;v<n;++v)if(rng()%5==0)dag[u].push_back(v);auto order=topoSort(dag);assert(order.size()==n);vector<int>pos(n);for(int i=0;i<n;++i)pos[order[i]]=i;for(int u=0;u<n;++u)for(int v:dag[u])assert(pos[u]<pos[v]);
 }
 for(ll threshold=0;threshold<=100;++threshold)assert(firstTrue(0,100,[&](ll x){return x>=threshold;})==threshold);
 for(ll mod=1;mod<100;++mod)for(ll a=-20;a<=20;++a){ll brute=1%mod;for(ll b=0;b<30;++b){assert(modPow(a,b,mod)==brute);brute=(__int128)brute*((a%mod+mod)%mod)%mod;}}
 assert(topoSort({{1},{0}}).empty());assert(lisLength({})==0);assert(prefixSum({})==vector<ll>{0});assert(countMatches("aaaa","aa")==3);
 cout<<"PASS: 13 GNU++17 snippets, randomized checks and boundary cases.\n";
}`;
try{fs.writeFileSync(path.join(dir,'checks.cpp'),snippets+checks);cp.execFileSync('g++',['-std=gnu++17','-O2','-Wall','-Wextra',path.join(dir,'checks.cpp'),'-o',path.join(dir,'checks')],{stdio:'pipe'});cp.execFileSync(path.join(dir,'checks'),{stdio:'inherit'});}finally{fs.rmSync(dir,{recursive:true,force:true});}
