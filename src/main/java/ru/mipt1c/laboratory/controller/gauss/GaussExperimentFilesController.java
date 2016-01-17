package ru.mipt1c.laboratory.controller.gauss;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.mipt1c.laboratory.db.dto.GaussExperimentFilesDto;
import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;
import ru.mipt1c.laboratory.security.LaboratoryUserDetails;
import ru.mipt1c.laboratory.service.ConfigProvider;
import ru.mipt1c.laboratory.service.GaussExperimentService;

import javax.servlet.ServletException;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/gauss/files")
public class GaussExperimentFilesController {

    private static final Logger LOGGER = Logger.getLogger(GaussExperimentFilesController.class);

    @Autowired
    GaussExperimentService gaussExperimentService;

    @RequestMapping(method = RequestMethod.POST, headers={"content-type=multipart/form-data"},
                                                 produces = "application/json;charset=UTF-8")
    public AsynchResponseJson uploadFile(
            @RequestParam("name") String displayName,
            @RequestParam("access") Integer access,
            @RequestParam("file") MultipartFile file,
            AbstractAuthenticationToken token) throws ServletException, IOException {
        AsynchResponseJson asynchResponseJson;

        Integer userId = ((LaboratoryUserDetails) token.getPrincipal()).getUserId();

        Integer fileId = gaussExperimentService.saveFile(file, displayName, access, userId);

        if(fileId != null) {
            asynchResponseJson = new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_SUCCESS);
            asynchResponseJson.addResponseParam("fileName", displayName);
            asynchResponseJson.addResponseParam("fileId", fileId);
        } else {
            asynchResponseJson = new AsynchResponseJson(AsynchResponseJson.RESPONSE_CODE_GENERAL_ERROR);
        }

        return asynchResponseJson;

    }

    @RequestMapping(method = RequestMethod.GET)
    public List<GaussExperimentFilesDto> getFiles(AbstractAuthenticationToken token) throws ServletException, IOException {
        Integer userId = ((LaboratoryUserDetails) token.getPrincipal()).getUserId();
        return gaussExperimentService.getFiles(userId);
    }

    @RequestMapping(value = "/{fileId}")
    public List<List<Integer>> loadFile(@PathVariable int fileId) {
        return gaussExperimentService.loadFile(fileId);
    }
}