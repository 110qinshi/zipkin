package zipkin.server.internal;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * @Author: hxl
 * @Description:
 * @Date: created in 10:47 2018/5/28
 */
public class CleanDataJob {

  private static int SAVE_DAY = 15; //数据保留时间

  private static long ONE_DAY_TIME = 24*60*60*1000;//一天的毫秒数

  @Value("${zipkin.elasticsearch.hosts}")
  private String elasticsearchHost;

  ScheduledExecutorService scheduledExecutorService = Executors.newSingleThreadScheduledExecutor();

  OkHttpClient.Builder builder = new OkHttpClient.Builder();
  {
    builder.connectTimeout(2000, TimeUnit.MILLISECONDS);
    builder.readTimeout(2000, TimeUnit.MILLISECONDS);
    builder.writeTimeout(2000, TimeUnit.MILLISECONDS);
  }

  private OkHttpClient okHttpClient = builder.build();

  public void run() {
    if(okHttpClient == null){
      System.out.println("elasticsearchHttp is null.");
      return;
    }
    Runnable job = () -> {
      System.out.println("清除过期日志.");
      Request request = new Request.Builder()
        .url(elasticsearchHost+"/_cat/indices")
        .build();

      Call call = okHttpClient.newCall(request);
      SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      try {
        Response res = call.execute();
        if(res.code() == org.apache.http.HttpStatus.SC_OK){
          String respBody = res.body().string();
          System.out.println("zipkin log index response:"+ respBody);
          if(!StringUtils.isEmpty(respBody)){
            String[] indexRow = respBody.split("\\n");
            Map<String, String> indexMap = new HashMap<>();
            for(String str : indexRow) {
              if(!StringUtils.isEmpty(str)){
                String [] rows = str.split(" ");
                if(rows.length > 2){
                  System.out.println(rows[2]);
                  String indexStr = rows[2];
                  if(indexStr.indexOf("-") != -1){
                    String dataStr = indexStr.substring(indexStr.indexOf("-")+1);
                    indexMap.put(dataStr, indexStr);
                  }
                }
              }
            }
            indexMap.forEach((key, value) ->{
              System.out.println("date:"+key+", index:"+value);
              try {
                Date date = dateFormat.parse(key+" 00:00:00");

                System.out.println("dateTime:"+date.getTime());

                if((System.currentTimeMillis()-date.getTime()) > ((SAVE_DAY-1) * ONE_DAY_TIME)){
//                  Request delReq = new Request.Builder()
//                    .url(elasticsearchHost+"/"+value)
//                    .delete()
//                    .build();
//
//                  Call delCall = okHttpClient.newCall(request);
                }

              } catch (ParseException e) {
                e.printStackTrace();
              }
            });
          }
        }else {
        }
      } catch (IOException e) {
        e.printStackTrace();
      }
    };
    scheduledExecutorService.scheduleWithFixedDelay(job, 1, 6, TimeUnit.SECONDS);
  }
}